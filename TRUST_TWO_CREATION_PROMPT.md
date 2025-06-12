# trust two. - Complete Recreation Prompt

## Project Overview

Create a React TypeScript tablet-based platform called "trust two." (lowercase with period) designed for surf, ski, and skate shops. This is a complete recreation of the trust. platform to avoid existing bugs and ensure clean implementation.

## Core Requirements

### Platform Identity
- **Name**: "trust two." (always lowercase with period)
- **Target**: Surf, ski, and skate shops
- **Device**: Optimized for tablets and iPads
- **Theme**: Dark mode throughout with minimalist, clean design

### Architecture
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Styled Components with dark theme
- **Routing**: React Router DOM
- **Backend**: Node.js + Express + PostgreSQL
- **Authentication**: JWT-based for shop owners

## Design System

### Color Scheme
```typescript
const darkTheme = {
  colors: {
    primary: 'linear-gradient(135deg, #101014 0%, #18181c 100%)',
    secondary: '#1a1a1a',
    accent: '#2a2a2a',
    text: '#f5f5f5',
    textSecondary: '#b0b0b0',
    border: '#333333'
  },
  fonts: {
    primary: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  }
}
```

### UI Principles
- Dark backgrounds with light text
- Minimal, clean typography
- Responsive design for tablets
- Smooth transitions and hover effects
- Modern card-based layouts

## Core Features

### 1. Homepage Layout
- Large centered "trust two." title
- Triangular icon layout with three sport icons:
  - **Top**: Surfboard icon (surf)
  - **Bottom Left**: Ski/snowboard icon (ski) 
  - **Bottom Right**: Skateboard icon (skate)
- Clickable period (.) in title leads to employee login
- Shop status indicator when logged in

### 2. Sport Categories & Products

#### Surfing 🏄‍♀️
- **Boards**: Height, weight, experience, wave conditions
- **Wetsuits**: Size, water temperature, thickness
- **Fins**: Board type, experience, fin setup, surf style

#### Skiing/Snowboarding ⛷️
- **Snowboards**: Height, weight, experience, riding style
- **Skis**: Height, weight, experience, terrain preference
- **Boots**: Foot size, experience, flex preference
- **Helmets**: Head size, features, activity type
- **Goggles**: Face size, lens type, fit type

#### Skating 🛹
- **Decks**: Height, shoe size, skating style, width preference
- **Trucks**: Deck size, riding style, turn preference
- **Wheels**: Surface type, hardness, diameter
- **Helmets**: Head size, skating style, certification

### 3. Dynamic Forms System

Create reusable form field definitions:

```typescript
// Common fields used across categories
const commonFields = {
  height: { name: 'height', label: 'Height', type: 'select', options: ['Under 5\'0"', '5\'0" - 5\'4"', '5\'4" - 5\'8"', '5\'8" - 6\'0"', 'Over 6\'0"'] },
  weight: { name: 'weight', label: 'Weight', type: 'select', options: ['Under 120 lbs', '120-150 lbs', '150-180 lbs', '180-210 lbs', 'Over 210 lbs'] },
  experience: { name: 'experience', label: 'Experience Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] }
};

// Sport-specific form fields
const categoryForms = {
  surf: {
    boards: [commonFields.height, commonFields.weight, commonFields.experience, /* surf-specific fields */],
    wetsuits: [/* wetsuit-specific fields */],
    fins: [/* fin-specific fields */]
  },
  ski: {
    snowboards: [commonFields.height, commonFields.weight, commonFields.experience, /* ski-specific fields */],
    skis: [/* ski-specific fields */],
    boots: [/* boot-specific fields */],
    helmets: [/* helmet-specific fields */],
    goggles: [/* goggle-specific fields */]
  },
  skate: {
    decks: [commonFields.height, /* skate-specific fields */],
    trucks: [/* truck-specific fields */],
    wheels: [/* wheel-specific fields */],
    helmets: [/* helmet-specific fields */]
  }
};
```

### 4. Product Recommendation Engine

Create intelligent matching based on:
- User physical characteristics
- Experience level
- Preferences and style
- Product specifications
- Stock availability

```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description?: string;
  features: string[];
  category: string;
  sport: string;
  quantity: number;
  inStock: boolean;
  image?: string;
  specifications?: ProductSpecifications;
}

interface RecommendationProduct extends Product {
  score: number;
  matchReasons: string[];
}
```

### 5. Shop Management System

#### Authentication Flow
- Employee/shop registration and login
- JWT token-based authentication
- Secure password hashing with bcrypt

#### Shop Admin Dashboard
- Product inventory management (CRUD operations)
- Analytics and reporting
- Shop settings and configuration
- Low stock alerts and notifications

#### Product Management
- Add/edit/delete products with specifications
- Image upload capability
- Stock quantity tracking
- Category and sport assignment

## Routing Structure

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/sport/:sport" element={<SportPage />} />
  <Route path="/sport/:sport/category/:category" element={<CategoryPage />} />
  <Route path="/recommendations" element={<RecommendationPage />} />
  <Route path="/login" element={<EmployeeLogin />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/admin/products/new" element={<AddProduct />} />
  <Route path="/admin/products" element={<ProductList />} />
  <Route path="/admin/products/edit/:id" element={<EditProduct />} />
  <Route path="/admin/settings" element={<ShopSettings />} />
  <Route path="/admin/analytics" element={<Analytics />} />
</Routes>
```

## Backend API Endpoints

### Authentication
- `POST /api/login` - Shop authentication
- `POST /api/register` - New shop registration

### Products
- `GET /api/products` - Get products (with filters)
- `POST /api/products` - Create new product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)

### Recommendations
- `POST /api/recommendations` - Generate customer recommendations

### Analytics
- `GET /api/analytics/overview` - Get shop analytics (authenticated)

### Shop Settings
- `GET /api/shop/settings` - Get shop settings (authenticated)
- `PUT /api/shop/settings` - Update shop settings (authenticated)

## Database Schema

### Core Tables
```sql
-- Shops table
CREATE TABLE shops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  sport VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  features TEXT[],
  stock_quantity INTEGER DEFAULT 0,
  specifications JSONB,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer sessions table
CREATE TABLE customer_sessions (
  id SERIAL PRIMARY KEY,
  session_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Technology Stack

### Frontend Dependencies
```json
{
  "dependencies": {
    "@types/recharts": "^1.8.29",
    "@types/styled-components": "^5.1.34",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.1",
    "recharts": "^2.15.3",
    "styled-components": "^6.1.18"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "pg": "^8.16.0",
    "uuid": "^9.0.1"
  }
}
```

## Key Implementation Notes

### TypeScript Interfaces
Create comprehensive type definitions for forms, products, and API responses to ensure type safety throughout the application.

### State Management
Use React hooks (useState, useEffect) for local state management. Consider Context API for global state if needed.

### Error Handling
Implement comprehensive error handling with proper user feedback for network issues, authentication failures, and validation errors.

### Performance Optimization
- Lazy load components where appropriate
- Optimize images for tablet displays
- Implement proper loading states
- Use React.memo for expensive components

### Security Considerations
- Validate all user inputs
- Sanitize data before database storage
- Implement proper CORS configuration
- Use secure JWT secret and proper token expiration

## Sample Shop Credentials
Include test shops for development:
1. **Wave Riders Surf Shop** - admin@waveriders.com / password
2. **Mountain Peak Ski Shop** - admin@mountainpeak.com / password  
3. **Street Style Skate Shop** - admin@streetstyle.com / password

## Development Workflow

1. Set up project structure with Vite + React + TypeScript
2. Implement dark theme and styled components
3. Create routing structure and basic page layouts
4. Build homepage with triangular icon layout
5. Implement sport pages and category selection
6. Create dynamic form system with reusable components
7. Build recommendation engine logic
8. Set up PostgreSQL database and backend API
9. Implement authentication and shop management
10. Add product management features
11. Create analytics and reporting
12. Test and optimize for tablet devices

## Expected File Structure

```
trust-two/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.tsx
│   │   ├── SportPage.tsx
│   │   ├── CategoryPage.tsx
│   │   ├── RecommendationPage.tsx
│   │   ├── EmployeeLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AddProduct.tsx
│   │   ├── ProductList.tsx
│   │   ├── EditProduct.tsx
│   │   ├── ShopSettings.tsx
│   │   ├── Analytics.tsx
│   │   └── index.ts
│   ├── contexts/
│   ├── data/
│   │   └── formFields.ts
│   ├── hooks/
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── recommendationEngine.ts
│   ├── App.tsx
│   └── main.tsx
├── backend/
│   ├── database_schema.sql
│   ├── server.js
│   ├── database.js
│   ├── package.json
│   └── .env
├── package.json
├── vite.config.ts
└── README.md
```

This prompt provides a complete blueprint for recreating the trust. platform as "trust two." with all the necessary technical details, avoiding any existing bugs and ensuring a clean, production-ready implementation optimized for tablet use in surf, ski, and skate shops.
