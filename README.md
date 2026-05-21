# Multi-Vendor eCommerce Platform (Laravel 12 + React + Inertia.js)

A modern, full-stack **Multi-Vendor eCommerce Website** built using:

- **Backend**: Laravel 12 (API-first approach, Filament Admin, Stripe)
- **Frontend**: React + Inertia.js + TypeScript
- **Features**: Product variations, cart, checkout, vendor management, role-based access, and more!

> ⚠️ This project is currently in **Phase 1** and under active development.

---

## ⚙️ Tech Stack

| Layer       | Technology                               |
| ----------- | ---------------------------------------- |
| Backend     | Laravel 12, PHP 8.x                      |
| Frontend    | React.js, Inertia.js, TypeScript         |
| Admin Panel | [Filament PHP](https://filamentphp.com/) |
| Payments    | Stripe                                   |
| Styling     | Tailwind CSS                             |
| Auth        | Laravel Breeze                           |
| Roles & Permissions | Spatie Laravel Permission        |
| Media Handling       | Spatie Media Library            |

---

## Features Implemented (Phase 1)

- User authentication (register/login/logout)
- Shop page with product listings
- Product variations with images
- Guest cart + cart transfer on login
- Add to cart and cart management
- Stripe payment integration
- User profile page
- Admin dashboard (using Filament)
- Vendor dashboard (using Filament)
- Role-based access (Spatie Permissions)
- Product management (admin/vendor)
- Media uploads with Spatie Media Library

---

## Upcoming Features (Planned)

- **Expanded Admin & Vendor Management Panels**
- **Vendor payouts and earnings management**
- **Wishlist functionality**
- **Complete homepage with banners, offers, and featured sections**
- **Advanced shop filters (variant, brand, etc)**
- **Sales analytics for admin and vendors**
- **Product reviews and ratings**
- **Product variation type management from admin**
- **Discount & promotional pricing features**
- **Product UI improvements: badges, availability, and quick views**
- **Complete dynamic CMS-driven management from admin**

---

## Project Setup

### Backend (Laravel)

```bash
git clone https://github.com/your-username/your-repo.git
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend (React + Inertia)

```bash
cd frontend
npm install
npm run dev
```

### Screenshots

#### Home Screens

##### Home Page
![Home Page](public/images/screenshots/home-page.png)

##### Home Page After Login
![Home Page After Login](public/images/screenshots/home-page-after-login.png)


#### Shop & Product Screens

##### Shop Page
![Shop Page](public/images/screenshots/shop.png) 

##### Product Detail Page
![Product Detail](public/images/screenshots/product-detail.png)

##### Cart Page
![Cart Page](public/images/screenshots/cart-page.png)


#### User Panel

##### User Profile
![Profile Page](public/images/screenshots/user-profile.png)


#### Admin Panel

##### Department List
![Department List](public/images/screenshots/admin-department-list.png)

##### Department Edit + Category Management
![Department Edit](public/images/screenshots/edit-departmentand-category%20list%20page.png)


#### Vendor Panel

##### Product List
![Product List](public/images/screenshots/vendor-product-list-page.png)

##### Product Image Upload
![Product Images](public/images/screenshots/product-images.png)

##### Variation Types Management
![Variation Types](public/images/screenshots/product-variation-types.png)

##### Product Variations
![Product Variations](public/images/screenshots/product-variations.png)



