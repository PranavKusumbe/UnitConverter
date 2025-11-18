# 🎨 Visual Style Guide - Modern Unit Converter

## Color System

### Light Mode
```css
Primary Green:      #1ABA85
Dark Green:         #148C67
Teal Blue:          #1FA2FF
Aqua Start:         #00D4FF
Aqua End:           #1FA2FF

Background:         Linear gradient (Purple to violet)
                    #667eea → #764ba2

Card Background:    rgba(255, 255, 255, 0.25) with backdrop-blur
Text Primary:       #111827
Text Secondary:     #6B7280
```

### Dark Mode
```css
Primary Green:      #1ABA85 (same, but with glow)
Background:         Linear gradient (Deep navy)
                    #0a0e1a → #1a1f2e → #0f1419

Card Background:    rgba(31, 41, 55, 0.8) with backdrop-blur
Border Accent:      rgba(99, 102, 241, 0.3)
Input Background:   #111827
Text Primary:       #F3F4F6
Text Secondary:     #D1D5DB

Glow Effects:       All interactive elements glow on hover
Shadows:            Deeper, with accent colors
```

## Typography

### Font Family
- **Primary:** Poppins (Google Fonts)
- **Fallback:** sans-serif
- **Monospace:** Courier New (for kbd elements)

### Font Sizes
```
Logo Title:         32px (24px mobile)
Tab Buttons:        18px (16px tablet, 14px mobile)
Input Labels:       16px
Input Fields:       17px (15px mobile)
Dropdowns:          16px
Convert Button:     18px (16px mobile)
Result Display:     22px (20px tablet, 18px mobile)
Footer Text:        14px
Help Text:          14px
```

### Font Weights
```
Light:              300
Regular:            400
Medium:             500
Semi-Bold:          600
Bold:               700
```

## Spacing Scale

Using 4-point system:
```
XS:    4px
S:     8px
M:     12px
L:     16px
XL:    24px
XXL:   32px
```

## Component Specifications

### Header
```
Height:             70px
Position:           Sticky (top: 0)
Background:         White (Light) / Dark with blur (Dark)
Shadow:             0 2px 10px rgba(0,0,0,0.1)
Dark Border:        1px solid rgba(99, 102, 241, 0.2)
```

### Category Tabs
```
Padding:            12px 24px
Border Radius:      12px
Background:         Glassmorphism
Active State:       White background with green border
Dark Active:        Green tint with glow effect
Hover:              Lift up 2px with shadow
```

### Conversion Card
```
Max Width:          520px
Border Radius:      20px
Padding:            24px
Background:         Glassmorphism
Shadow:             Multi-layer with color accent
Border:             1px solid (transparent/accent)
```

### Input Fields
```
Height:             48px (44px mobile)
Border Radius:      12px
Padding:            12px 16px
Border:             1px solid
Focus State:        4px glow ring + lift 1px
Dark Background:    #111827 with inset shadow
```

### Buttons

#### Convert Button
```
Width:              100%
Height:             auto (14px padding)
Border Radius:      14px
Background:         Linear gradient (Aqua to Green)
Shadow:             Layered with color
Hover:              Lift 2px + increase shadow + shine effect
Active:             Scale to 97%
```

#### Swap Button
```
Size:               45px × 45px
Border Radius:      50% (circle)
Background:         Solid green / gradient (dark mode)
Hover:              Lift 3px + rotate 180°
Click:              Rotate 360° + scale 95%
Ripple:             White overlay expanding from center
```

#### Dark Mode Toggle
```
Size:               50px × 50px (45px mobile)
Border Radius:      50% (circle)
Background:         Gradient (Light) / Orange gradient (Dark)
Hover:              Lift 3px + rotate 15° + ripple
Icon:               Moon (Light) / Sun (Dark)
```

### Result Box
```
Padding:            20px
Border Radius:      16px
Background:         White / Dark with glow
Text Color:         Dark green / Bright green with glow
Border:             2px (transparent → accent on active)
Animation:          Pulse on update
```

### Notifications
```
Position:           Fixed (top: 100px, right: 30px)
Padding:            16px 22px
Border Radius:      12px
Background:         #1ABA85 (success) / #EF4444 (error)
Animation:          Slide in from right
Duration:           2 seconds auto-dismiss
```

## Animation Specifications

### Timing Functions
```
Fast:               0.3s ease
Medium:             0.4s ease
Slow:               0.7s ease
```

### Key Animations

#### Fade In (Page Load)
```
Duration:           0.7s
From:               opacity 0, translateY(20px)
To:                 opacity 1, translateY(0)
```

#### Slide Up (Card Entrance)
```
Duration:           0.5s
From:               translateY(40px), opacity 0
To:                 translateY(0), opacity 1
```

#### Slide Down (Header)
```
Duration:           0.5s
From:               translateY(-100%), opacity 0
To:                 translateY(0), opacity 1
```

#### Shimmer (Loading)
```
Duration:           1.5s infinite
Effect:             Gradient slide left to right
Colors:             Light: white overlay
                    Dark: purple overlay
```

#### Result Pulse
```
Duration:           0.5s
Effect:             Scale 1 → 1.05 → 1
```

#### Float (Help Button)
```
Duration:           3s infinite
Effect:             translateY(0) → -10px → 0
```

#### Ripple (Button Press)
```
Duration:           0.5-0.6s
Effect:             Circle expand from 0 to full size
Color:              rgba(255, 255, 255, 0.3)
```

#### Shine (Convert Button)
```
Duration:           0.5s on hover
Effect:             White gradient sweep left to right
```

## Effects Library

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.25);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Dark Glassmorphism
```css
background: rgba(31, 41, 55, 0.8);
backdrop-filter: blur(20px);
border: 1px solid rgba(99, 102, 241, 0.3);
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
```

### Glow Effect (Dark Mode)
```css
box-shadow: 0 0 20px rgba(26, 186, 133, 0.3);
text-shadow: 0 0 10px rgba(26, 186, 133, 0.3);
```

### Focus Ring
```css
box-shadow: 0 0 0 4px rgba(26, 186, 133, 0.15);
border-color: #1ABA85;
```

### Lift Effect
```css
transform: translateY(-2px);
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
```

## Responsive Breakpoints

### Mobile (≤ 480px)
- Single column layout
- Reduced font sizes (10% smaller)
- Full-width buttons
- Vertical input stacking
- Smaller icon sizes
- Reduced spacing

### Tablet (481px - 768px)
- Moderate font sizes
- Two-column where appropriate
- Touch-friendly targets (min 44px)

### Desktop (769px - 1024px)
- Standard layout
- Centered card (max-width: 520px)
- All features visible

### Large Desktop (≥ 1025px)
- Enhanced hover effects
- Larger interaction areas
- More dramatic animations

## Accessibility

### Focus Indicators
```css
outline: 2px solid #1ABA85;
outline-offset: 2px;
```

### Text Contrast
- Light mode: AAA rated
- Dark mode: AAA rated
- All text meets WCAG 2.1 standards

### Interactive Elements
- Minimum touch target: 44px × 44px
- Keyboard navigation: Full support
- Screen readers: ARIA labels included

### Motion
- Respects prefers-reduced-motion
- All animations are smooth (60fps)
- No jarring transitions

## Icon Usage

### Font Awesome Classes
```
Header Logo:        fa-exchange-alt
Dark Mode:          fa-moon / fa-sun
Tabs:               fa-weight, fa-ruler, fa-temperature-high, etc.
Swap Button:        fa-exchange-alt
Convert Button:     fa-calculator
Success:            fa-check-circle
Help:               fa-question
Copy:               fa-copy
```

## Best Practices

### Performance
- Use CSS transforms for animations (GPU accelerated)
- Avoid animating width/height
- Use will-change for complex animations
- Optimize backdrop-filter usage

### User Experience
- Instant feedback on all interactions
- Clear visual hierarchy
- Consistent spacing rhythm
- Smooth state transitions
- Loading states for async operations

### Code Organization
- CSS variables for theme consistency
- Modular JavaScript functions
- Clear naming conventions
- Comprehensive comments

---

**Style Guide Version:** 2.0  
**Last Updated:** November 18, 2025  
**Compatible With:** All modern browsers
