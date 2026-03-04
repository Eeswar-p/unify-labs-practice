# 📸 Images Folder

This folder contains all images for the portfolio website.

---

## 📋 Required Images

### Profile Photo
**File:** `profile.jpg`
- **Purpose:** Your professional headshot for the About section
- **Recommended Size:** 300x300px to 500x500px
- **Aspect Ratio:** Square (1:1)
- **Format:** JPG or PNG
- **File Size:** <200KB (optimize with TinyPNG)

**Tips:**
- Use a professional, high-quality photo
- Solid color or blurred background works best
- Good lighting and clear face visibility
- Smile and dress professionally
- Center your face in the frame

---

### Project Screenshots

#### Project 1
**File:** `project1.jpg`
- **Purpose:** E-Commerce Platform screenshot
- **Recommended Size:** 600x400px to 1200x800px
- **Aspect Ratio:** 3:2 or 16:9
- **Format:** JPG (optimized)
- **File Size:** <300KB

#### Project 2
**File:** `project2.jpg`
- **Purpose:** Task Management App screenshot
- **Recommended Size:** 600x400px to 1200x800px
- **Aspect Ratio:** 3:2 or 16:9
- **Format:** JPG (optimized)
- **File Size:** <300KB

#### Project 3
**File:** `project3.jpg`
- **Purpose:** Weather Forecast App screenshot
- **Recommended Size:** 600x400px to 1200x800px
- **Aspect Ratio:** 3:2 or 16:9
- **Format:** JPG (optimized)
- **File Size:** <300KB

**Tips for Project Screenshots:**
- Show the most interesting/impressive part of your project
- Clean, uncluttered interface view
- Good contrast and readability
- Mobile mockups can be included
- Use browser mockups for web apps (optional)

---

## 🎨 Image Optimization Tools

Before uploading images, optimize them:

### Online Tools (Free)
- **TinyPNG:** https://tinypng.com/ (Best for PNG/JPG compression)
- **Squoosh:** https://squoosh.app/ (Google's image optimizer)
- **Compressor.io:** https://compressor.io/ (Supports multiple formats)
- **ImageOptim:** https://imageoptim.com/ (macOS app)

### Tips:
1. **Export at 2x resolution** for retina displays, then optimize
2. **Use JPG for photos** (smaller file size)
3. **Use PNG for graphics** with transparency
4. **WebP format** is great for modern browsers (optional)
5. **Target file size:** <300KB per image

---

## 🖼️ Fallback Images

If you don't have images yet, the website uses **SVG placeholders** automatically:

```html
<!-- SVG fallback is built into the HTML -->
<img src="assets/images/profile.jpg" 
     alt="Profile photo"
     onerror="this.src='data:image/svg+xml,...'">
```

These will show colored placeholders with text until you add real images.

---

## 📐 Image Dimensions Reference

| Image | Recommended Size | Aspect Ratio | Max File Size |
|-------|-----------------|--------------|---------------|
| Profile Photo | 400x400px | 1:1 (square) | 200KB |
| Project Screenshot | 800x533px | 3:2 | 300KB |
| Project Screenshot (Alt) | 800x450px | 16:9 | 300KB |

---

## 🚀 Adding Images

### Option 1: Direct Upload
1. Save your images with the exact filenames listed above
2. Place them in this `assets/images/` folder
3. Refresh the browser - images will appear automatically

### Option 2: Different Filenames
If you want to use different filenames, update `index.html`:

```html
<!-- Change this -->
<img src="assets/images/profile.jpg" alt="...">

<!-- To your filename -->
<img src="assets/images/my-photo.png" alt="...">
```

---

## 🎯 Quick Checklist

Before deploying, ensure:
- [ ] Profile photo added and optimized
- [ ] All 3 project screenshots added
- [ ] All images are under 300KB
- [ ] Images are in JPG or PNG format
- [ ] Filenames match exactly (case-sensitive)
- [ ] Images display correctly in browser
- [ ] Alt text is descriptive in HTML

---

## 🌐 Additional Images (Optional)

You can add more images for:
- **Open Graph Image:** `og-image.jpg` (1200x630px for social media sharing)
- **Favicon:** `favicon.ico` or `favicon.png` (32x32px)
- **More Projects:** `project4.jpg`, `project5.jpg`, etc.
- **Testimonials:** Photos of people who recommend you
- **Certificates:** Screenshots of your credentials

---

## 📝 Image Attribution

If you use stock photos or images from others:
- **Free Stock Photos:** 
  - Unsplash: https://unsplash.com/
  - Pexels: https://www.pexels.com/
  - Pixabay: https://pixabay.com/
  
- **Mockup Tools:**
  - Mockuphone: https://mockuphone.com/
  - Screely: https://www.screely.com/
  - Smart Mockups: https://smartmockups.com/

Always check license requirements!

---

## 🔧 Troubleshooting

### Images not showing?
- Check file path is correct: `assets/images/filename.jpg`
- Ensure file extension matches (`.jpg` not `.JPG`)
- Verify image file is in this folder
- Clear browser cache and refresh

### Images look blurry?
- Increase image resolution
- Export at 2x size, then optimize
- Use higher quality JPG export (90% quality)

### Images load slowly?
- Optimize/compress images
- Reduce file dimensions
- Convert to WebP format (optional)
- Add `loading="lazy"` attribute (already done in HTML)

---

**Need help?** Refer to the main README.md or DEPLOYMENT.md guide.

---

*Last Updated: March 4, 2026*
