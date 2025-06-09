// Shared form field definitions to reduce duplication
import type { FormField, CategoryForms } from '../types'

// Common fields that are reused across categories
export const commonFields = {
  height: { name: 'height', label: 'Height', type: 'text', placeholder: "e.g. 5'10\"" } as FormField,
  weight: { name: 'weight', label: 'Weight', type: 'text', placeholder: 'e.g. 170 lbs' } as FormField,
  experience: { 
    name: 'experience', 
    label: 'Experience Level', 
    type: 'select', 
    options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  } as FormField,
  headCircumference: {
    name: 'headCircumference', 
    label: 'Head Circumference (inches)', 
    type: 'text', 
    placeholder: 'e.g. 22.8'
  } as FormField,
  footWidth: {
    name: 'footWidth', 
    label: 'Foot Width', 
    type: 'select', 
    options: ['Narrow', 'Medium', 'Wide']
  } as FormField,
  volume: {
    name: 'volume', 
    label: 'Foot Volume', 
    type: 'select', 
    options: ['Low volume', 'Medium volume', 'High volume']
  } as FormField
}

// Category-specific form configurations
export const categoryForms: CategoryForms = {
  surf: {
    boards: [
      commonFields.height,
      commonFields.weight,
      commonFields.experience,
      { name: 'waveConditions', label: 'Preferred Wave Conditions', type: 'select', options: ['Small waves (1-3ft)', 'Medium waves (3-6ft)', 'Large waves (6ft+)', 'All conditions'] },
      { name: 'surfStyle', label: 'Surf Style', type: 'select', options: ['Longboard cruising', 'Shortboard performance', 'All-around', 'Big wave'] }
    ],
    wetsuits: [
      commonFields.height,
      commonFields.weight,
      { name: 'chestSize', label: 'Chest Size', type: 'text', placeholder: 'e.g. 38"' },
      { name: 'waterTemp', label: 'Water Temperature', type: 'select', options: ['Warm (70°F+)', 'Moderate (60-70°F)', 'Cool (50-60°F)', 'Cold (Below 50°F)'] },
      { name: 'thickness', label: 'Preferred Thickness', type: 'select', options: ['2mm (Summer)', '3/2mm (Spring/Fall)', '4/3mm (Winter)', '5/4mm (Cold water)'] }
    ],
    fins: [
      { name: 'boardType', label: 'Board Type', type: 'select', options: ['Longboard', 'Shortboard', 'Fish', 'Funboard', 'SUP'] },
      commonFields.experience,
      { name: 'finSetup', label: 'Fin Setup', type: 'select', options: ['Single fin', 'Twin fin', 'Thruster (3 fin)', 'Quad (4 fin)', '2+1 (3 fin)', 'Not sure'] },
      { name: 'surfStyle', label: 'Surf Style', type: 'select', options: ['Cruising/noseriding', 'High performance', 'All-around', 'Speed/drive', 'Maneuverability'] },
      { name: 'waveType', label: 'Wave Type', type: 'select', options: ['Small mushy waves', 'Clean medium waves', 'Powerful waves', 'Mixed conditions'] },
      { name: 'finMaterial', label: 'Fin Material Preference', type: 'select', options: ['Fiberglass (stiff)', 'Plastic (flexible)', 'Carbon fiber (high performance)', 'Bamboo (eco-friendly)', 'No preference'] }
    ]
  },
  ski: {
    snowboards: [
      commonFields.height,
      commonFields.weight,
      { name: 'bootSize', label: 'Boot Size', type: 'text', placeholder: 'e.g. 10' },
      commonFields.experience,
      { name: 'ridingStyle', label: 'Riding Style', type: 'select', options: ['All-mountain', 'Freestyle', 'Freeride', 'Powder'] },
      { name: 'terrain', label: 'Preferred Terrain', type: 'select', options: ['Groomed runs', 'Park & pipe', 'Backcountry', 'Mixed terrain'] }
    ],
    skis: [
      commonFields.height,
      commonFields.weight,
      { name: 'bootSize', label: 'Boot Size', type: 'text', placeholder: 'e.g. 27.5' },
      commonFields.experience,
      { name: 'skiType', label: 'Ski Type', type: 'select', options: ['All-mountain', 'Carving', 'Freestyle', 'Touring', 'Racing'] },
      { name: 'terrain', label: 'Preferred Terrain', type: 'select', options: ['Groomed runs', 'Off-piste', 'Park', 'Backcountry'] }
    ],
    boots: [
      { name: 'footLength', label: 'Foot Length (cm)', type: 'text', placeholder: 'e.g. 28.5' },
      commonFields.footWidth,
      commonFields.experience,
      { name: 'flex', label: 'Preferred Flex', type: 'select', options: ['Soft (60-80)', 'Medium (80-100)', 'Stiff (100-120)', 'Very Stiff (120+)'] },
      commonFields.volume
    ],
    'snowboard boots': [
      { name: 'footLength', label: 'Foot Length (inches)', type: 'text', placeholder: 'e.g. 11.2' },
      commonFields.footWidth,
      commonFields.experience,
      { name: 'flex', label: 'Preferred Flex', type: 'select', options: ['Soft (3-5)', 'Medium (5-7)', 'Stiff (7-9)', 'Very Stiff (9-10)'] },
      { name: 'lacingSystem', label: 'Lacing System', type: 'select', options: ['Traditional laces', 'BOA system', 'Speed lacing', 'Hybrid'] },
      { name: 'ridingStyle', label: 'Riding Style', type: 'select', options: ['All-mountain', 'Freestyle', 'Freeride', 'Powder'] },
      commonFields.volume
    ],
    'ski boots': [
      { name: 'footLength', label: 'Foot Length (inches)', type: 'text', placeholder: 'e.g. 11.2' },
      { name: 'footWidth', label: 'Foot Width', type: 'select', options: ['Narrow (3.9-3.94")', 'Medium (3.94-4.02")', 'Wide (4.02-4.17")', 'Extra Wide (4.17"+)'] },
      commonFields.experience,
      { name: 'flex', label: 'Flex Rating', type: 'select', options: ['Soft (60-80)', 'Medium (80-100)', 'Stiff (100-120)', 'Very Stiff (120-140)', 'Race (140+)'] },
      { name: 'skiType', label: 'Ski Type', type: 'select', options: ['All-mountain', 'Carving', 'Racing', 'Touring', 'Freestyle'] },
      { name: 'calfWidth', label: 'Calf Width', type: 'select', options: ['Narrow', 'Medium', 'Wide'] },
      commonFields.volume
    ],
    helmets: [
      commonFields.headCircumference,
      { name: 'activity', label: 'Primary Activity', type: 'select', options: ['Alpine skiing', 'Snowboarding', 'Freestyle', 'Backcountry'] },
      { name: 'features', label: 'Desired Features', type: 'select', options: ['Basic protection', 'Ventilation system', 'Audio compatibility', 'Goggle integration'] }
    ],
    goggles: [
      { name: 'faceSize', label: 'Face Size', type: 'select', options: ['Small', 'Medium', 'Large'] },
      { name: 'lensType', label: 'Lens Type', type: 'select', options: ['Clear/Low light', 'All conditions', 'Sunny conditions', 'Interchangeable'] },
      { name: 'fitType', label: 'Fit Type', type: 'select', options: ['Asian fit', 'Standard fit', 'Wide fit'] }
    ]
  },
  skate: {
    decks: [
      commonFields.height,
      { name: 'shoeSize', label: 'Shoe Size', type: 'text', placeholder: 'e.g. 10' },
      commonFields.experience,
      { name: 'skateStyle', label: 'Skating Style', type: 'select', options: ['Street', 'Vert', 'Cruising', 'Tricks'] },
      { name: 'deckWidth', label: 'Preferred Width', type: 'select', options: ['7.5-7.75"', '7.75-8.0"', '8.0-8.25"', '8.25-8.5"', '8.5"+'] }
    ],
    trucks: [
      { name: 'deckWidth', label: 'Deck Width', type: 'text', placeholder: 'e.g. 8.0"' },
      { name: 'ridingStyle', label: 'Riding Style', type: 'select', options: ['Street', 'Vert', 'Cruising', 'All-around'] },
      { name: 'truckHeight', label: 'Truck Height', type: 'select', options: ['Low', 'Mid', 'High'] }
    ],
    wheels: [
      { name: 'ridingStyle', label: 'Riding Style', type: 'select', options: ['Street', 'Vert', 'Cruising', 'Tricks'] },
      { name: 'surface', label: 'Primary Surface', type: 'select', options: ['Smooth concrete', 'Rough streets', 'Skate parks', 'Mixed terrain'] },
      { name: 'wheelSize', label: 'Preferred Size', type: 'select', options: ['50-53mm (Street)', '54-58mm (All-around)', '59mm+ (Cruising)'] }
    ],
    helmets: [
      { name: 'headCircumference', label: 'Head Circumference (cm)', type: 'text', placeholder: 'e.g. 58' },
      { name: 'skateStyle', label: 'Skating Style', type: 'select', options: ['Street', 'Vert', 'Bowl', 'Cruising'] },
      { name: 'certifications', label: 'Certification Preference', type: 'select', options: ['CPSC (Basic)', 'ASTM (Skate specific)', 'Dual certified'] }
    ]
  }
}
