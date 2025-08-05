# Portfolio Website - Computer Science Student

A modern, interactive portfolio website featuring 3D animated mathematical shapes and a sleek black and silver design theme.

## ✨ Features

### 🎨 Visual Design
- **3D Animated Background**: Moving silver mathematical shapes (icosahedrons, octahedrons, dodecahedrons, tetrahedrons, torus, cones)
- **Black & Silver Theme**: Professional color scheme with gradient text effects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects, parallax scrolling, and interactive elements

### 📱 Sections
1. **Hero Section**: Introduction as Computer Science student at FOM University Cologne
2. **About Section**: Personal information and skills showcase
3. **Projects Section**: Portfolio of your work with project cards
4. **Video Section**: Space for your introduction video
5. **Contact Section**: Contact form and information

### 🚀 Interactive Elements
- **3D Mouse Interaction**: Background shapes respond to mouse movement
- **Smooth Navigation**: Fixed navbar with smooth scrolling
- **Typing Animation**: Animated hero title
- **Mobile Menu**: Hamburger menu for mobile devices
- **Contact Form**: Functional contact form with validation

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with flexbox/grid, animations, and responsive design
- **JavaScript ES6+**: Interactive functionality and 3D animations
- **Three.js**: 3D graphics and mathematical shape rendering
- **Google Fonts**: Inter font family for modern typography

## 📁 File Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # Documentation
```

## 🎯 Customization Guide

### 1. Personal Information
Edit the following sections in `index.html`:

**Hero Section (lines 42-52):**
```html
<h1 class="hero-title">
    <span class="gradient-text">Computer Science</span>
    <span class="hero-subtitle">Student & Developer</span>
</h1>
<p class="hero-description">
    Studying Computer Science at FOM University of Applied Sciences in Cologne, Germany.
    Passionate about technology, innovation, and creating digital solutions.
</p>
```

**Contact Information (lines 200-210):**
```html
<div class="contact-item">
    <h4>Email</h4>
    <p>your.email@example.com</p>
</div>
```

### 2. Adding Your Photo
Replace the photo placeholder in the About section:
```html
<!-- Replace this placeholder -->
<div class="image-placeholder">
    <div class="placeholder-text">Your Photo</div>
</div>

<!-- With your actual image -->
<img src="your-photo.jpg" alt="Your Name" class="profile-image">
```

Add this CSS for the image:
```css
.profile-image {
    width: 250px;
    height: 300px;
    border-radius: 15px;
    object-fit: cover;
}
```

### 3. Adding Your Projects
Edit the project cards in the Projects section:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Add your project screenshot -->
        <img src="project-screenshot.jpg" alt="Project Name">
    </div>
    <div class="project-content">
        <h3 class="project-title">Your Project Name</h3>
        <p class="project-description">
            Description of your project and what it does.
        </p>
        <div class="project-tags">
            <span class="tag">Technology 1</span>
            <span class="tag">Technology 2</span>
        </div>
        <div class="project-links">
            <a href="https://your-demo-link.com" class="project-link">Live Demo</a>
            <a href="https://github.com/yourusername/project" class="project-link">GitHub</a>
        </div>
    </div>
</div>
```

### 4. Adding Your Introduction Video
Replace the video placeholder:

```html
<!-- Replace the placeholder div -->
<div class="video-placeholder">...</div>

<!-- With your actual video -->
<video controls>
    <source src="your-introduction-video.mp4" type="video/mp4">
    <source src="your-introduction-video.webm" type="video/webm">
    Your browser does not support the video tag.
</video>
```

### 5. Customizing Skills
Update the skills section in the About area:
```html
<div class="skills">
    <span class="skill-tag">Your Skill 1</span>
    <span class="skill-tag">Your Skill 2</span>
    <span class="skill-tag">Your Skill 3</span>
    <!-- Add more skills as needed -->
</div>
```

## 🎨 Color Customization

The website uses CSS custom properties for easy color customization. You can modify the colors by updating these values in `styles.css`:

```css
:root {
    --primary-silver: #c0c0c0;
    --secondary-silver: #808080;
    --background-black: #000000;
    --text-white: #ffffff;
    --text-gray: #b0b0b0;
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 767px and below

## 🚀 Deployment Options

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed automatically

### Vercel
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Deploy with one click

## 🔧 Performance Tips

1. **Optimize Images**: Compress your photos and project screenshots
2. **Video Format**: Use modern formats like WebM for better compression
3. **Lazy Loading**: Add `loading="lazy"` to images below the fold
4. **CDN**: Consider using a CDN for faster Three.js loading

## 🐛 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📞 Support

If you need help customizing the website or encounter any issues:

1. Check the browser console for error messages
2. Ensure all file paths are correct
3. Verify that Three.js is loading properly
4. Test on different devices and browsers

## 🎉 Features to Add Later

Consider adding these features as you grow your portfolio:

- Blog section for technical articles
- Dark/Light mode toggle
- Multi-language support
- Project filtering by technology
- Testimonials section
- Resume download link
- Social media integration
- Analytics tracking

---

**Note**: Remember to replace all placeholder content with your actual information, projects, and media files to make the portfolio truly yours!