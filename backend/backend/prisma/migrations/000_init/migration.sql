-- PostgreSQL schema for pet super-app MVP
CREATE TYPE role AS ENUM ('tutor', 'prestador', 'lojista', 'admin');
CREATE TYPE partner_type AS ENUM ('lojista', 'prestador');
CREATE TYPE partner_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE order_status AS ENUM ('new', 'preparing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE appointment_status AS ENUM ('requested', 'accepted', 'completed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('pix', 'card');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role role NOT NULL DEFAULT 'tutor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    cep TEXT NOT NULL,
    street TEXT NOT NULL,
    number TEXT NOT NULL,
    complement TEXT,
    neighborhood TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partners (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    type partner_type NOT NULL,
    fantasy_name TEXT NOT NULL,
    document TEXT NOT NULL,
    description TEXT,
    address_id INTEGER NOT NULL REFERENCES addresses(id),
    service_radius_km DOUBLE PRECISION,
    status partner_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    size TEXT NOT NULL,
    age INTEGER,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    partner_id INTEGER NOT NULL REFERENCES partners(id),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price DOUBLE PRECISION NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    partner_id INTEGER NOT NULL REFERENCES partners(id),
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    base_price DOUBLE PRECISION NOT NULL,
    unit TEXT NOT NULL,
    pet_size TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER NOT NULL REFERENCES users(id),
    partner_id INTEGER NOT NULL REFERENCES partners(id),
    address_id INTEGER NOT NULL REFERENCES addresses(id),
    status order_status NOT NULL DEFAULT 'new',
    total_amount DOUBLE PRECISION NOT NULL,
    payment_method payment_method NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER NOT NULL REFERENCES users(id),
    pet_id INTEGER NOT NULL REFERENCES pets(id),
    partner_id INTEGER NOT NULL REFERENCES partners(id),
    service_id INTEGER NOT NULL REFERENCES services(id),
    start_datetime TIMESTAMPTZ NOT NULL,
    end_datetime TIMESTAMPTZ NOT NULL,
    status appointment_status NOT NULL DEFAULT 'requested',
    amount DOUBLE PRECISION NOT NULL,
    payment_method payment_method NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES users(id),
    target_type TEXT NOT NULL,
    target_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key TEXT NOT NULL,
    value TEXT NOT NULL
);
