# Design to HTML/CSS Implementation Instructions

## Overview

This document provides instructions for generating HTML/CSS implementations from PIXA design documents located in `docs/designs/`. Each design document should be converted into static HTML files that demonstrate the described user interface and workflows.

## Process

### 1. Design Document Analysis

- Read all design files in `docs/designs/` folder
- Each design file contains:
  - Front-end component library selection
  - Color palette specifications
  - Typography scale
  - Key user flows
  - Screen list
  - Reusable component specifications

### 2. Reference Materials

When creating HTML/CSS implementations, refer to the following supporting documentation:

- **Latest PRP (Product Requirement Prompts)**: `docs/prps/` - Contains business context and requirements
- **Latest PRD (Product Requirements Document)**: `docs/prds/_archive/` - Detailed product specifications
- **Latest Architecture Document**: `docs/architecture/` - Technical system design

### 3. Folder Structure

For each design file with timestamp `YYYYMMDD-HHMMSS`:

```
{timestamp}/
├── index.html          # Login page
├── dashboard.html      # Main dashboard
├── message-detail.html # Message chain details (if applicable)
├── message-list.html   # Message listing (if applicable)
├── create-message.html # Message creation form (if applicable)
├── new-message.html    # Alternative message creation (if applicable)
├── message-form.html   # Message form (if applicable)
├── document-viewer.html # Document viewing interface (if applicable)
├── document-management.html # Document management (if applicable)
└── styles.css          # All CSS styles
```

### 4. Implementation Requirements

#### Static HTML Only

- No JavaScript functionality required
- Pure HTML and CSS implementation
- Focus on visual design and layout
- Use placeholder content for demonstration

#### Component Library Adherence

Each design specifies a different UI framework approach:

- **Bootstrap 5**: Use CDN links and Bootstrap classes
- **Material-UI/MUI**: Implement Material Design principles with custom CSS
- **Material Design 3**: Follow latest Material Design guidelines

#### Color System Implementation

Implement the exact color palette specified in each design:

- Primary colors for main actions and branding
- Status colors for Red→Amber→Green workflow progression
- Neutral colors for text and backgrounds
- Ensure proper contrast ratios for accessibility

#### Typography Scale

Follow the specified typography hierarchy:

- Display sizes for page headers
- Headline sizes for section titles
- Body text for content
- Caption sizes for metadata
- Use specified font families (Inter, Roboto, system fonts)

#### Key User Flows

Create pages that demonstrate:

1. **Authentication Flow**: Login with role selection
2. **Dashboard Flow**: Status overview and message chains
3. **Message Creation Flow**: Form-based message creation
4. **Message Detail Flow**: Message chain viewing with documents
5. **Document Management Flow**: File upload, download, and viewing

### 5. Core Features to Demonstrate

#### Message Status System

- **Red Status**: Draft, error, or newly created messages
- **Amber Status**: In-progress, pending review messages
- **Green Status**: Completed, confirmed messages
- Visual indicators (colored dots, badges, chips)

#### Role-Based Interface

Support three user roles:

- **Issuer**: Companies raising capital
- **Fund Manager**: Investment professionals
- **Custodian**: Financial institutions providing custody services

#### Message Types

Demonstrate 6 core message types:

- **001**: Capital Raise Initiation
- **301**: Fund Manager Instruction
- **401**: Custodian Response
- **501**: Settlement Instruction
- **503**: Settlement Confirmation
- **014**: General Correspondence

#### Document Management

- File upload interfaces (drag-and-drop styling)
- Document listing with metadata
- Download and view actions
- Access control indicators
- File type icons (PDF, DOC, XLS)

### 6. Responsive Design

- Mobile-first approach
- Tablet and desktop breakpoints
- Touch-friendly interface elements
- Accessible navigation patterns

### 7. Accessibility Requirements

- WCAG 2.1 AA compliance
- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast color combinations
- Alternative text for images and icons

### 8. Content Guidelines

Use realistic placeholder content:

- Company names: TechCorp, InvestFund, CustodyBank, RegTech Solutions
- User names: Emma Thompson, Marcus Chen, Sarah Johnson
- Document names: Term Sheet, Subscription Agreement, Settlement Instructions
- Timestamps: Relative times (2 hours ago, 1 day ago, etc.)
- File sizes: Realistic values (2.3 MB, 1.8 MB, etc.)

### 9. Quality Standards

- Valid HTML5 markup
- Organized CSS with consistent naming
- Cross-browser compatibility
- Performance optimization
- Clean, maintainable code structure

## Usage Instructions

When you need to create HTML/CSS implementations for all design files:

1. **Read Design Files**: Parse all `.md` files in `docs/designs/` that match the pattern `design_YYYYMMDD-HHMMSS.md`
2. **Extract Timestamp**: Use the timestamp from each filename for folder naming (format: `YYYYMMDD-HHMMSS`)
3. **Check Existing Folders**: For each design file, check if a folder with the matching timestamp already exists in `docs/designs/`
   - If folder exists: **Skip HTML generation** for this design (implementation already complete)
   - If folder does NOT exist: Proceed with HTML generation for this design
4. **Create Folders**: Generate timestamp-named folders ONLY for designs that don't have existing folders
5. **Reference Documentation**: Use latest PRP, PRD, and architecture files for context
6. **Generate HTML/CSS**: Create static implementations following each design's specifications (only for new folders)
7. **Validate Implementation**: Ensure all requirements are met per design document

**Important**: This incremental approach prevents regenerating HTML for designs that already have implementations, allowing you to process only new design documents efficiently.

This process ensures consistent, high-quality HTML/CSS implementations that accurately represent the platform design vision across different UI frameworks and design approaches.
