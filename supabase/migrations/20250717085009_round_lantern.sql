-- Database Schema for Booking System
-- This is a PostgreSQL schema, adapt for your database system

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    preferred_time TIME,
    service_type VARCHAR(100) NOT NULL,
    number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0 AND number_of_guests <= 20),
    special_requests TEXT,
    agree_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_date_range CHECK (check_out_date > check_in_date),
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in_date ON bookings(check_in_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_service_type ON bookings(service_type);

-- Create audit log table for tracking changes
CREATE TABLE IF NOT EXISTS booking_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL, -- 'created', 'updated', 'cancelled', etc.
    old_values JSONB,
    new_values JSONB,
    changed_by VARCHAR(255), -- user ID or system identifier
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger function for audit logging
CREATE OR REPLACE FUNCTION audit_booking_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO booking_audit_log (booking_id, action, new_values, changed_by)
        VALUES (NEW.id, 'created', to_jsonb(NEW), 'system');
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO booking_audit_log (booking_id, action, old_values, new_values, changed_by)
        VALUES (NEW.id, 'updated', to_jsonb(OLD), to_jsonb(NEW), 'system');
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO booking_audit_log (booking_id, action, old_values, changed_by)
        VALUES (OLD.id, 'deleted', to_jsonb(OLD), 'system');
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for audit logging
CREATE TRIGGER booking_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON bookings
    FOR EACH ROW EXECUTE FUNCTION audit_booking_changes();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating updated_at
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create view for booking statistics
CREATE OR REPLACE VIEW booking_statistics AS
SELECT 
    DATE_TRUNC('month', created_at) as month,
    service_type,
    status,
    COUNT(*) as booking_count,
    AVG(number_of_guests) as avg_guests,
    SUM(number_of_guests) as total_guests
FROM bookings
GROUP BY DATE_TRUNC('month', created_at), service_type, status
ORDER BY month DESC, service_type, status;

-- Sample data for testing (remove in production)
INSERT INTO bookings (
    full_name, email, phone, check_in_date, check_out_date, 
    preferred_time, service_type, number_of_guests, special_requests, agree_to_terms
) VALUES 
(
    'John Doe', 'john.doe@example.com', '+1-555-123-4567', 
    CURRENT_DATE + INTERVAL '7 days', CURRENT_DATE + INTERVAL '10 days',
    '15:00', 'accommodation', 2, 'Anniversary celebration', TRUE
),
(
    'Jane Smith', 'jane.smith@example.com', '+1-555-987-6543',
    CURRENT_DATE + INTERVAL '14 days', CURRENT_DATE + INTERVAL '16 days',
    '14:00', 'spa', 1, 'Relaxation weekend', TRUE
);

-- Grant permissions (adjust based on your user roles)
-- GRANT SELECT, INSERT, UPDATE ON bookings TO booking_app_user;
-- GRANT SELECT ON booking_statistics TO booking_app_user;
-- GRANT SELECT ON booking_audit_log TO booking_admin_user;