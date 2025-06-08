![image](https://github.com/pabloDYEL/ESTATICA-44/assets/116923433/28d9931a-6b57-44e8-b088-2cb364e21db0)

# Steps Register

A modern, multi-step registration form built with pure HTML, CSS, and vanilla JavaScript. This project provides a clean, intuitive user registration experience with step-by-step progression and form validation.

## Overview

Steps Register is a static website featuring a multi-step registration process designed to improve user experience by breaking complex forms into manageable steps. The interface includes progress indicators, smooth transitions, and comprehensive form validation.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **No Dependencies**: Pure static implementation
- **No Server Required**: Client-side only
- **Multi-Step Logic**: JavaScript-powered step navigation
- **Form Validation**: Real-time input validation
- **Responsive Design**: Mobile-first approach
- **Modern CSS**: Flexbox, CSS Variables, Smooth Animations

## Features

- Multi-step registration form with progress tracking
- Step-by-step navigation with "Continue" functionality
- Real-time form validation with user feedback
- Progress indicator showing current step (Step 1 of 3)
- Smooth animations and transitions between steps
- Responsive design optimized for all devices
- Clean, modern dark theme UI
- Accessible form elements with proper labeling
- Form data persistence across steps

## Project Structure

```
steps-register/
├── index.html              # Main registration page
├── css/
│   ├── main.css           # Main stylesheet
│   ├── form.css           # Form and step styles
│   ├── animations.css     # Transition animations
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js           # Main JavaScript functionality
│   ├── step-manager.js   # Step navigation logic
│   ├── form-validation.js # Form validation rules
│   └── data-handler.js   # Form data management
├── pages/
│   ├── step-2.html       # Second step (if using separate pages)
│   ├── step-3.html       # Third step (if using separate pages)
│   └── success.html      # Registration success page
├── assets/
│   ├── icons/           # UI icons and graphics
│   └── images/         # Background images
└── README.md
```

## Quick Start

### Prerequisites

- Modern web browser
- Text editor or IDE
- Basic knowledge of HTML, CSS, and JavaScript

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/pabloWIB/Steps-Register.git
   cd Steps-Register
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your preferred browser
   # Or use a local development server
   
   # Using Node.js live-server (if available)
   npx live-server
   
   # Using PHP built-in server (if available)
   php -S localhost:8000
   
   # Or just double-click index.html
   ```

3. **Start developing**
   - Edit HTML files for form structure and content
   - Modify CSS files for styling and animations
   - Update JavaScript files for step logic and validation
   - Customize form fields and validation rules

## Deployment

### Static Hosting Options

**GitHub Pages**
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Site will be available at `https://username.github.io/repository-name`

**Netlify**
1. Drag and drop project folder to Netlify
2. Or connect GitHub repository for automatic deployments
3. Configure form handling with Netlify Forms (optional)
4. Site deployed instantly with custom domain options

**Vercel**
1. Import project from GitHub
2. Zero-configuration deployment
3. Automatic HTTPS and global CDN

**Other Options**
- Surge.sh: Simple command-line deployment
- Firebase Hosting: Google's static hosting
- AWS S3: Amazon's static website hosting

### Form Backend Integration

Since this is a static site, you'll need a backend service for actual user registration:

- **Netlify Forms**: Built-in form handling with step consolidation
- **Formspree**: Third-party form handling service
- **Firebase**: User authentication and database
- **Supabase**: Open-source Firebase alternative
- **Custom API**: Integrate with your own backend service

## Customization

### Step Configuration
- Modify step count in `js/step-manager.js`
- Add or remove form fields for each step
- Customize progress indicator styling
- Update step validation rules

### Form Fields
- Edit form inputs in HTML files
- Add new validation rules in `js/form-validation.js`
- Customize placeholder text and labels
- Implement conditional field logic

### Styling
- Update color scheme in CSS variables
- Modify form layout and spacing
- Customize button styles and hover effects
- Adjust animation timing and effects

### Step Logic
- Configure step navigation rules
- Implement data persistence between steps
- Add custom validation for each step
- Create conditional step flow

## Step Management Examples

### Basic Step Navigation
```javascript
// Example step management
class StepManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.formData = {};
    }
    
    nextStep() {
        if (this.validateCurrentStep()) {
            this.currentStep++;
            this.updateUI();
        }
    }
    
    validateCurrentStep() {
        // Add validation logic for current step
        return true;
    }
}
```

### Form Data Persistence
```javascript
// Example data handling between steps
function saveStepData(stepNumber, data) {
    const formData = JSON.parse(localStorage.getItem('registrationData') || '{}');
    formData[`step${stepNumber}`] = data;
    localStorage.setItem('registrationData', JSON.stringify(formData));
}
```

## Form Structure

### Step 1: Basic Information
- Name field with validation
- Email field with format validation
- Continue button with form validation

### Step 2: Additional Details
- (Customizable based on your needs)
- Professional information, preferences, etc.

### Step 3: Confirmation
- Review collected information
- Final submission
- Terms and conditions acceptance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

### Development Guidelines
- Follow semantic HTML structure for accessibility
- Use consistent CSS naming conventions
- Write clean, commented JavaScript
- Test step navigation across different browsers
- Ensure mobile responsiveness
- Validate form data at each step
- Implement proper error handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Repository**: https://github.com/pabloWIB/Steps-Register.git

For questions or support, please open an issue on GitHub.
