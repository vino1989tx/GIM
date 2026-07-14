import { Product, ProductCategory } from '../models/product.model';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'connectivity',
    title: 'Connectivity & Gateways',
    subtitle: 'Edge communications for sensor networks',
    icon: 'wifi',
    description: 'Gateways and edge nodes that connect field sensors to cloud dashboards and enable remote monitoring.',
    featuredProductId: 'communication-node',
    image: '/assets/GIM_Images/Ms - Communication Node.jpg',
    imagePosition: 'center'
  },
  {
    id: 'tilt-inclinometer',
    title: 'Tilt & Inclinometer Systems',
    subtitle: 'Angle and movement monitoring for structures and excavation.',
    icon: 'straighten',
    description: 'Systems for measuring tilt, inclination and alignment in tunnels, slopes, buildings and earthworks.',
    featuredProductId: 'digital-tiltmeter',
    image: '/assets/GIM_Images/Digital Tilt Meter.jpg',
    imagePosition: 'center 38%'
  },
  {
    id: 'strain-load',
    title: 'Strain & Load Monitoring',
    subtitle: 'Stress, strain and load measurement in critical assets.',
    icon: 'bolt',
    description: 'Robust gauges and load cells for structural health monitoring, support design validation and load tracking.',
    featuredProductId: 'arc-weldable-strain-gauge',
    image: '/assets/GIM_Images/Center Hole Type Load Cell.jpg',
    imagePosition: 'center 48%'
  },
  {
    id: 'displacement-settlement',
    title: 'Displacement & Settlement Monitoring',
    subtitle: 'Movement measurement for cracks, settlement and joints.',
    icon: 'trending_down',
    description: 'Sensors and targets for tracking displacement, settlement, crack growth and joint movement in infrastructure.',
    featuredProductId: 'dynamic-displacement-sensor',
    image: '/assets/GIM_Images/Ms - Dynamic Displacement Sensor.jpg',
    imagePosition: 'center 44%'
  },
  {
    id: 'vibration-environment',
    title: 'Vibration & Environmental Monitoring',
    subtitle: 'Dynamic sensing for vibration, acceleration and conditions.',
    icon: 'air',
    description: 'Wireless sensors for vibration, acceleration, air quality and environmental monitoring in complex sites.',
    featuredProductId: 'environmental-sensor',
    image: '/assets/GIM_Images/MS - Environmental Sensor.jpg',
    imagePosition: 'center 40%'
  },
  {
    id: 'survey-markers',
    title: 'Survey Targets & Markers',
    subtitle: 'Reference points and markers for deformation monitoring.',
    icon: 'location_on',
    description: 'Precise survey markers, bi-reflex targets and settlement points for accurate structural movement measurement.',
    featuredProductId: 'ground-settlement-marker',
    image: '/assets/GIM_Images/Bi-Reflex Target.jpg',
    imagePosition: 'center 46%'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'communication-node',
    name: 'Communication Node',
    category: 'connectivity',
    shortDescription: 'Wireless gateway for third-party analog sensors, digitizing legacy instruments and transmitting data over LoRaWAN.',
    featureBullets: [
      'Full remote configuration and alarms',
      'Supports voltage, current, resistive and thermistor sensors',
      'IP67 weatherproof housing for harsh environments'
    ],
    keyFeatures: [
      { title: 'Legacy sensor integration', description: 'Connects third-party analog sensors without replacing existing instrumentation.' },
      { title: 'LoRaWAN transport', description: 'Reliable long-range data transmission in remote sites.' },
      { title: 'Autonomous operation', description: 'Battery-powered deployment with intelligent acquisition logic.' }
    ],
    applications: ['Analog sensor conversion', 'Remote geotechnical sites', 'Bridge and tunnel monitoring'],
    specifications: [
      { label: 'Communication', value: 'LoRaWAN / LTE / Wi-Fi' },
      { label: 'Input', value: '8 analog channels' },
      { label: 'Ingress protection', value: 'IP67' }
    ],
    images: ['/assets/GIM_Images/Ms - Communication Node.jpg'],
    richContent: {
      label: 'Third-party sensor gateway',
      headline: 'Wireless gateway for third-party analog sensors',
      overview: 'The Communication Node enables traditional analog and wired sensors to be monitored remotely over LoRaWAN networks. By digitizing analog signals and transmitting them wirelessly, it turns legacy instruments such as strain gauges, crack meters, piezometers, load cells, and temperature probes into connected monitoring assets without forcing a full sensor replacement.',
      highlights: [
        'Third-party sensors, one integrated system',
        'Wireless LoRaWAN connectivity for remote and large-scale sites',
        'Multi-year battery autonomy with configurable acquisition settings',
        'Full remote configuration and alarms via the monitoring platform',
        'IP67-rated standalone design for harsh outdoor environments',
        'Multi-input analog interface'
      ],
      interfaceHeading: 'Supports up to 8 analog sensor interfaces',
      interfaceBullets: [
        '4-20 mA',
        'mV / Wheatstone bridge',
        'Voltage inputs (5 V, 12 V)',
        'Potentiometer',
        'NTC thermistor',
        'Pt100 / Pt1000',
        'Vibrating wire sensors'
      ],
      sections: [
        {
          title: 'Broad sensor compatibility',
          description: 'Compatible with voltage, current, resistive, thermistor, and vibrating wire sensors used in geotechnical and structural monitoring.'
        },
        {
          title: 'Configurable acquisition logic',
          description: 'Acquisition and transmission strategies can be tuned to balance data resolution, power consumption, and connectivity, including event-driven capture for critical measurements.'
        },
        {
          title: 'Robust autonomous operation',
          description: 'Battery-powered, weatherproof construction supports long-term unattended deployment in demanding outdoor conditions.'
        }
      ],
      measurementHeading: 'What this sensor measures',
      measurements: [
        'Probe data from connected analog sensors, converted into engineering units such as mm, deg C, or kPa.',
        'Vibrating wire frequency, converted to strain, pressure, displacement, or equivalent units.',
        'Internal or external temperature used for data correction and correlation.'
      ]
    }
  },
  {
    id: 'gateway',
    name: 'LoRaWAN Gateway',
    category: 'connectivity',
    shortDescription: 'Central hub for remote monitoring networks, transmitting sensor data securely to cloud systems.',
    featureBullets: [
      'Multi-channel backhaul over Ethernet, 4G LTE and Wi-Fi',
      'Redundant communication for reliable data flow',
      'Rugged design for industrial deployment'
    ],
    keyFeatures: [
      { title: 'Network backbone', description: 'Connects many field sensors into a single monitoring network.' },
      { title: 'High reliability', description: 'Designed for remote and hard-to-access locations.' },
      { title: 'Cloud-ready', description: 'Seamless integration with MyMove monitoring platform.' }
    ],
    applications: ['Site-wide sensor networks', 'Remote infrastructure', 'Construction monitoring'],
    specifications: [
      { label: 'Backhaul', value: 'Ethernet / 4G LTE / Wi-Fi' },
      { label: 'Power', value: '12–24 VDC' },
      { label: 'Operating temperature', value: '-20°C to +60°C' }
    ],
    images: ['/assets/GIM_Images/Ms - Gateway.jpg']
  },
  {
    id: 'tiltmeter-wireless-sensor',
    name: 'Tiltmeter Wireless Sensor',
    category: 'tilt-inclinometer',
    shortDescription: 'Battery-powered tiltmeter for static inclination monitoring with synchronized sensor networks.',
    featureBullets: [
      'Wireless LoRaWAN connection',
      'Low-power operation for long-term measurement',
      'Multiple units can be synchronized for distributed monitoring'
    ],
    keyFeatures: [
      { title: 'Static tilt monitoring', description: 'Precise measurement of horizontal inclination changes.' },
      { title: 'Long-term deployment', description: 'Battery-backed design for months of continuous operation.' },
      { title: 'Remote visibility', description: 'Data fed into cloud dashboards for site teams.' }
    ],
    applications: ['Slope stability', 'Dam monitoring', 'Building tilt measurement'],
    specifications: [
      { label: 'Communication', value: 'LoRaWAN' },
      { label: 'Battery life', value: 'Up to 12 months' },
      { label: 'Accuracy', value: '0.01°' }
    ],
    images: ['/assets/GIM_Images/MS-Tiltmeter.jpg']
  },
  {
    id: 'high-precision-tilt-meter',
    name: 'High Precision Tilt Meter',
    category: 'tilt-inclinometer',
    shortDescription: 'MEMS-based tilt meter for accurate slope and deviation angle measurement in civil structures.',
    featureBullets: [
      'High precision MEMS accelerometer',
      'Portable design with reliable casing',
      'Easy integration with field instruments'
    ],
    keyFeatures: [
      { title: 'Accurate angular detection', description: 'Designed to capture small inclination changes.' },
      { title: 'Robust construction', description: 'Built for demanding site conditions.' },
      { title: 'Repeatable output', description: 'Stable reference for long-term monitoring.' }
    ],
    applications: ['Tunnel alignment', 'Excavation monitoring', 'Slope movement tracking'],
    specifications: [
      { label: 'Sensor type', value: 'MEMS tilt sensor' },
      { label: 'Measurement range', value: '±5°' },
      { label: 'Resolution', value: '0.0017°' }
    ],
    images: ['/assets/GIM_Images/High precision EL Tilt meter.jpg']
  },
  {
    id: 'digital-tiltmeter',
    name: 'Digital Tiltmeter',
    category: 'tilt-inclinometer',
    shortDescription: 'Portable digital tiltmeter with large LCD, backlight and rechargeable battery for field use.',
    featureBullets: [
      'Built-in battery with long runtime',
      'Large illuminated display',
      'Portable and easy to operate'
    ],
    keyFeatures: [
      { title: 'Field-ready design', description: 'Compact, single-body housing with battery and compensation.' },
      { title: 'Stable measurement output', description: 'Reliable readings for construction and lab environments.' },
      { title: 'User-friendly interface', description: 'Clear display and simple controls.' }
    ],
    applications: ['Structure monitoring', 'Construction control', 'Survey checks'],
    specifications: [
      { label: 'Display', value: 'Large LCD with backlight' },
      { label: 'Power', value: 'Rechargeable Li-ion battery' },
      { label: 'Operating temperature', value: '-20°C to +60°C' }
    ],
    images: ['/assets/GIM_Images/Digital Tilt Meter.jpg']
  },
  {
    id: 'inclinometer-monitoring-system',
    name: 'Inclinometer Monitoring System',
    category: 'tilt-inclinometer',
    shortDescription: 'Bluetooth-enabled inclinometer system with tablet interface and Excel report export.',
    featureBullets: [
      'BLE tablet support',
      'Data export to Excel',
      'Probe, reel cable and tablet included'
    ],
    keyFeatures: [
      { title: 'Bluetooth control', description: 'Configure and read inclinometer data from a tablet.' },
      { title: 'Portable reporting', description: 'Export measurement files directly via email.' },
      { title: 'Complete kit', description: 'Includes probe, cable reel and carrying case.' }
    ],
    applications: ['Slope monitoring', 'Tunnel convergence', 'Excavation control'],
    specifications: [
      { label: 'Interface', value: 'Bluetooth BLE' },
      { label: 'Data export', value: 'Excel / CSV' },
      { label: 'Accessory', value: 'Galaxy Tab A compatible' }
    ],
    images: ['/assets/GIM_Images/Inclinometer Monitoring System.jpg']
  },
  {
    id: 'slope-indicator-specs',
    name: 'Slope Indicator',
    category: 'tilt-inclinometer',
    shortDescription: 'Slope indicator for monitoring surface and shallow movement on slopes and structures.',
    featureBullets: [
      'Designed for slope and structural movement',
      'Robust monitoring components',
      'Clear measurement output'
    ],
    keyFeatures: [
      { title: 'Slope-specific design', description: 'Ideal for retaining walls and slope face monitoring.' },
      { title: 'Stable reference output', description: 'Provides reliable movement data over time.' },
      { title: 'Easy deployment', description: 'Simple setup in the field.' }
    ],
    applications: ['Slope stability', 'Retaining wall monitoring', 'Embankment tracking'],
    specifications: [
      { label: 'Sensor type', value: 'Dual-axis inclinometer' },
      { label: 'Output', value: 'Digital readout' },
      { label: 'Mounting', value: 'Surface installation' }
    ],
    images: ['/assets/GIM_Images/Digital Tilt Meter.jpg']
  },
  {
    id: 'wheel-type-inplace-inclinometer',
    name: 'Wheel-Type In-Place Inclinometer',
    category: 'tilt-inclinometer',
    shortDescription: 'In-place inclinometer with wheel-type measurement for horizontal displacement monitoring.',
    featureBullets: [
      'Measures movement across depth',
      'Built for excavation and natural ground',
      'High-resolution sensing'
    ],
    keyFeatures: [
      { title: 'In-place monitoring', description: 'Captures horizontal displacement over long zones.' },
      { title: 'Customizable length', description: 'Available in 1.0–3.0 m gauges for excavation works.' },
      { title: 'High resolution', description: 'Detailed movement data for critical projects.' }
    ],
    applications: ['Excavation monitoring', 'Ground displacement', 'Foundation movement'],
    specifications: [
      { label: 'Gauge length', value: '1.0–3.0 m' },
      { label: 'Resolution', value: '0.001 mm' },
      { label: 'Installation', value: 'In-place inclinometer pipe' }
    ],
    images: ['/assets/GIM_Images/Wheel Type In-Place Inclinometer.jpg']
  },
  {
    id: 'abs-inclinometer-casing',
    name: 'ABS Inclinometer Casing',
    category: 'tilt-inclinometer',
    shortDescription: 'Durable ABS casing for portable and servo-type inclinometers in underground installations.',
    featureBullets: [
      'Strong ABS construction',
      'Grooved pipe for direction control',
      'Suitable for underground displacement monitoring'
    ],
    keyFeatures: [
      { title: 'Rugged enclosure', description: 'Protects inclinometer sensors in harsh underground conditions.' },
      { title: 'Directional control', description: 'Groove design maintains measurement orientation.' },
      { title: 'Portable installation', description: 'Works with servo and portable inclinometer systems.' }
    ],
    applications: ['Underground displacement', 'Embankment monitoring', 'In-place inclinometer installations'],
    specifications: [
      { label: 'Material', value: 'ABS plastic' },
      { label: 'Use case', value: 'Underground inclinometer pipe' },
      { label: 'Compatibility', value: 'Servo and portable systems' }
    ],
    images: ['/assets/GIM_Images/ABS Inclinometer Casing.jpg']
  },
  {
    id: 'tilt-plate',
    name: 'Tilt Plate',
    category: 'tilt-inclinometer',
    shortDescription: 'Reference plate for tilt measurement, providing a stable surface for angle monitoring.',
    featureBullets: [
      'Precise reference surface for tilt sensors',
      'Designed for demanding site conditions',
      'Repeatable and stable measurement output'
    ],
    keyFeatures: [
      { title: 'Reference plate design', description: 'Improves tilt measurement reliability on structures.' },
      { title: 'Robust construction', description: 'Made for long-term installation in the field.' },
      { title: 'Compatibility', description: 'Works with tilt meters and inclinometer systems.' }
    ],
    applications: ['Tilt monitoring', 'Structural reference measurement', 'Construction control'],
    specifications: [
      { label: 'Material', value: 'High-strength steel' },
      { label: 'Use', value: 'Tilt measurement reference' },
      { label: 'Durability', value: 'Site-grade weather resistance' }
    ],
    images: ['/assets/GIM_Images/Tilt Plate.jpg']
  },
  {
    id: 'arc-weldable-strain-gauge',
    name: 'Arc-Weldable Strain Gauge',
    category: 'strain-load',
    shortDescription: 'Gauge designed for welding onto steel structures to measure stress under excavation and load.',
    featureBullets: [
      'High reproducibility and responsiveness',
      'Reduced temperature influence',
      'Waterproof structure for field durability'
    ],
    keyFeatures: [
      { title: 'Weldable mounting', description: 'Attaches directly to steel structure for accurate stress measurement.' },
      { title: 'Robust performance', description: 'Stable under long-term loading conditions.' },
      { title: 'Field-ready', description: 'Suitable for construction and heavy industrial applications.' }
    ],
    applications: ['Steel structure stress monitoring', 'Retaining wall stability', 'Support structure validation'],
    specifications: [
      { label: 'Gauge type', value: 'Arc-weldable' },
      { label: 'Output', value: 'Strain microstrain' },
      { label: 'Protection', value: 'Waterproof casing' }
    ],
    images: ['/assets/GIM_Images/VW - Arc-Weldable Type Strain Gauge.jpg']
  },
  {
    id: 'spot-weldable-strain-gauge',
    name: 'Spot-Weldable Strain Gauge',
    category: 'strain-load',
    shortDescription: 'Coil-housed spot-weldable strain gauge for responsive measurement with corrosion resistant design.',
    featureBullets: [
      'Waterproof and corrosion resistant',
      'Responsive to structural changes',
      'High stability under long-term loading'
    ],
    keyFeatures: [
      { title: 'Spot-weld installation', description: 'Quick mounting to steel elements for stress monitoring.' },
      { title: 'Corrosion resistant', description: 'Designed for harsh field exposure.' },
      { title: 'High response', description: 'Captures dynamic strain changes clearly.' }
    ],
    applications: ['Steel beam monitoring', 'Construction stress analysis', 'Bridge component measurement'],
    specifications: [
      { label: 'Gauge type', value: 'Spot-weldable' },
      { label: 'Accuracy', value: '±0.1% FS' },
      { label: 'Temperature range', value: '-20°C to +80°C' }
    ],
    images: ['/assets/GIM_Images/VW - Spot-Weldable Type Strain Gauge.jpg']
  },
  {
    id: 'embedment-strain-gauge',
    name: 'Embedment Strain Gauge',
    category: 'strain-load',
    shortDescription: 'Concrete-embedded strain gauge for long-term monitoring of stress distribution within structures.',
    featureBullets: [
      'Embedded installation in concrete',
      'Measures effective internal strain',
      'Suitable for load and stress verification'
    ],
    keyFeatures: [
      { title: 'Concrete embedment', description: 'Captures internal structural strain where surface sensors cannot.' },
      { title: 'Long-term stability', description: 'Designed for permanent installations.' },
      { title: 'Accurate stress tracking', description: 'Useful for tunnel and foundation monitoring.' }
    ],
    applications: ['Concrete structure monitoring', 'Foundation strain analysis', 'Tunnel lining stress assessment'],
    specifications: [
      { label: 'Installation', value: 'Embedded in concrete' },
      { label: 'Measurement', value: 'Strain / stress' },
      { label: 'Output', value: 'Electrical signal' }
    ],
    images: ['/assets/GIM_Images/VW - Embedment Type Strain Gauge.jpg']
  },
  {
    id: 'vw-type-load-cell',
    name: 'VW Type Load Cell',
    category: 'strain-load',
    shortDescription: 'High-accuracy load cell for anchor reaction force measurement in retaining walls and soil anchors.',
    featureBullets: [
      'Measures axial force in anchors',
      'Installed at earth anchors and tiebacks',
      'Helps assess stability after installation'
    ],
    keyFeatures: [
      { title: 'Anchor load measurement', description: 'Precise force readings for soil and rock anchors.' },
      { title: 'Field ruggedized', description: 'Built for geotechnical construction environments.' },
      { title: 'Reliable reporting', description: 'Used in support and retaining wall validation.' }
    ],
    applications: ['Anchor load testing', 'Retaining wall support', 'Slope stabilization monitoring'],
    specifications: [
      { label: 'Type', value: 'VW Load Cell' },
      { label: 'Capacity', value: 'Up to 2000 kN' },
      { label: 'Output', value: 'mV/V' }
    ],
    images: ['/assets/GIM_Images/VW Type Load Cell.jpg']
  },
  {
    id: 'center-hole-load-cell',
    name: 'Center Hole Load Cell',
    category: 'strain-load',
    shortDescription: 'Center-hole load cell for axial force measurement through anchor rods and tiebacks.',
    featureBullets: [
      'Center hole design for rod installation',
      'Monitors anchor and tieback loading',
      'High safety margin for structural use'
    ],
    keyFeatures: [
      { title: 'Rod-through load measurement', description: 'Captures axial force directly in anchor rods.' },
      { title: 'Construction-ready', description: 'Used in tieback and rock anchor systems.' },
      { title: 'Durable design', description: 'Works in harsh geotechnical settings.' }
    ],
    applications: ['Tieback monitoring', 'Anchored structure stability', 'Load verification'],
    specifications: [
      { label: 'Cell type', value: 'Center-hole load cell' },
      { label: 'Capacity', value: 'Varies by model' },
      { label: 'Protection', value: 'Weatherproof' }
    ],
    images: ['/assets/GIM_Images/Center Hole Type Load Cell.jpg']
  },
  {
    id: 'shotcrete-stress-meter',
    name: 'Shotcrete Stress Meter',
    category: 'strain-load',
    shortDescription: 'Stress meter installed before shotcrete placement to measure compression in tunnel linings.',
    featureBullets: [
      'Monitors shotcrete stress during construction',
      'Measures tangential and radial directions',
      'Supports tunnel safety verification'
    ],
    keyFeatures: [
      { title: 'Pre-shotcrete installation', description: 'Captures stresses before final lining is applied.' },
      { title: 'Multi-directional sensing', description: 'Reads stress in tunnel and shotcrete layers.' },
      { title: 'Construction safety', description: 'Useful for early warning and quality control.' }
    ],
    applications: ['Tunnel lining monitoring', 'Shotcrete quality control', 'Structural safety checks'],
    specifications: [
      { label: 'Measurement', value: 'Stress in shotcrete' },
      { label: 'Placement', value: 'Before lining application' },
      { label: 'Durability', value: 'Designed for construction exposure' }
    ],
    images: ['/assets/GIM_Images/VW Type Shotcrete Stress Meter.jpg']
  },
  {
    id: 'drive-point-piezometer',
    name: 'Drive Point Piezometer',
    category: 'strain-load',
    shortDescription: 'Pore pressure meter for soft ground and embankment foundations to monitor water pressure.',
    featureBullets: [
      'Measures pore water pressure in ground',
      'Suitable for embankment and foundation monitoring',
      'Designed for field reliability'
    ],
    keyFeatures: [
      { title: 'Soft ground pressure measurement', description: 'Used in embankment and foundation stability checks.' },
      { title: 'Field durable', description: 'Built for challenging geotechnical conditions.' },
      { title: 'Accurate readings', description: 'Supports safe construction decisions.' }
    ],
    applications: ['Embankment monitoring', 'Foundation pressure measurement', 'Groundwater control checks'],
    specifications: [
      { label: 'Type', value: 'Drive point piezometer' },
      { label: 'Use', value: 'Pore pressure monitoring' },
      { label: 'Installation', value: 'Small diameter drive point' }
    ],
    images: ['/assets/GIM_Images/Drive Point Type VW Piezometer.jpg']
  },
  {
    id: 'piezometer',
    name: 'Piezometer',
    category: 'strain-load',
    shortDescription: 'General pore pressure meter for monitoring groundwater and liquid pressure in soil and embankments.',
    featureBullets: [
      'Measures liquid and pore pressure',
      'Used for soft ground and embankment foundations',
      'High-accuracy NTC thermistor compensation'
    ],
    keyFeatures: [
      { title: 'Precise pressure readings', description: 'Tracks pore water changes in foundations and embankments.' },
      { title: 'Robust construction', description: 'Designed for long-term ground monitoring.' },
      { title: 'Temperature compensation', description: 'Maintains accuracy under changing conditions.' }
    ],
    applications: ['Groundwater monitoring', 'Embankment stability', 'Foundation pressure analysis'],
    specifications: [
      { label: 'Measurement', value: 'Pore water pressure' },
      { label: 'Sensor', value: 'NTC thermistor compensated' },
      { label: 'Installation', value: 'Borehole and embankment' }
    ],
    images: ['/assets/GIM_Images/VW Type Piezometer.jpg']
  },
  {
    id: 'soil-pressure-meter',
    name: 'Soil Pressure Meter',
    category: 'strain-load',
    shortDescription: 'Soil pressure meter for checking ground stability and load distribution around foundations.',
    featureBullets: [
      'Waterproof and dustproof design',
      'High precision and durability',
      'Easy connection with automatic equipment'
    ],
    keyFeatures: [
      { title: 'Soil load monitoring', description: 'Used to verify ground pressure around foundations.' },
      { title: 'Rugged design', description: 'Built to withstand field conditions.' },
      { title: 'High precision', description: 'Delivers accurate stability measurement.' }
    ],
    applications: ['Ground stability checks', 'Foundation monitoring', 'Soil pressure analysis'],
    specifications: [
      { label: 'Type', value: 'Soil pressure meter' },
      { label: 'Protection', value: 'Waterproof / dustproof' },
      { label: 'Use', value: 'Load measurement in soil' }
    ],
    images: ['/assets/GIM_Images/Soil Pressure Meter.jpg']
  },
  {
    id: 'soil-pressure-meter-variant',
    name: 'Soil Pressure Meter Variant',
    category: 'strain-load',
    shortDescription: 'Alternate soil pressure meter model for ground load and stability checks.',
    featureBullets: [
      'Waterproof design with electrical resistance sensing',
      'Reliable in soils and embankments',
      'High measurement precision'
    ],
    keyFeatures: [
      { title: 'Alternate configuration', description: 'Suitable for different geotechnical installation needs.' },
      { title: 'Resistant construction', description: 'Performs in moist ground conditions.' },
      { title: 'Accurate output', description: 'Used for engineering safety checks.' }
    ],
    applications: ['Embankment pressure monitoring', 'Groundwater load checks', 'Soil stability measurement'],
    specifications: [
      { label: 'Type', value: 'Soil pressure meter variant' },
      { label: 'Measurement', value: 'Electric resistance' },
      { label: 'Protection', value: 'High durability' }
    ],
    images: ['/assets/GIM_Images/Soil Pressure Meter 1.jpg']
  },
  {
    id: 'accelerometer',
    name: 'Accelerometer',
    category: 'vibration-environment',
    shortDescription: 'Wireless triaxial accelerometer for structural vibration monitoring and modal analysis.',
    featureBullets: [
      'Triaxial acceleration sensing',
      'Wireless battery-powered operation',
      'Programmable sampling rate from 40 to 640 Hz'
    ],
    keyFeatures: [
      { title: 'Dynamic vibration monitoring', description: 'Records acceleration events for structural health analysis.' },
      { title: 'Event-triggered capture', description: 'Detects threshold breaches automatically.' },
      { title: 'High resolution', description: 'Suitable for modal and vibration studies.' }
    ],
    applications: ['Machinery monitoring', 'Modal analysis', 'Seismic vibration tracking'],
    specifications: [
      { label: 'Axes', value: '3-axis' },
      { label: 'Sampling rate', value: '40–640 Hz' },
      { label: 'Communication', value: 'LoRaWAN' }
    ],
    images: ['/assets/GIM_Images/MS - Accelerometer.jpg']
  },
  {
    id: 'vibrometer',
    name: 'Vibrometer',
    category: 'vibration-environment',
    shortDescription: 'Wireless triaxial sensor for vibration velocity monitoring using MEMS technology.',
    featureBullets: [
      'Measures particle velocity along three axes',
      'Wireless transmission to cloud platform',
      'Optimized for long-term monitoring'
    ],
    keyFeatures: [
      { title: 'Particle velocity sensing', description: 'Captures structural vibration amplitude and dominant frequency.' },
      { title: 'MEMS technology', description: 'Stable performance with compact design.' },
      { title: 'Site-ready', description: 'Compatible with vibration standards and long-term deployments.' }
    ],
    applications: ['Vibration monitoring', 'Structural dynamics', 'Equipment health tracking'],
    specifications: [
      { label: 'Sensing', value: 'Triaxial vibration velocity' },
      { label: 'Connectivity', value: 'LoRaWAN' },
      { label: 'Power', value: 'Battery powered' }
    ],
    images: ['/assets/GIM_Images/Ms-Vibrometer.jpg']
  },
  {
    id: 'environmental-sensor',
    name: 'Environmental Sensor',
    category: 'vibration-environment',
    shortDescription: 'All-in-one wireless sensor for air quality, noise and wind monitoring in environmental assessment.',
    featureBullets: [
      'Multi-parameter environmental sensing',
      'Real-time LoRaWAN transmission',
      'Single standalone unit replaces multiple instruments'
    ],
    keyFeatures: [
      { title: 'Integrated measurements', description: 'Combines air quality, noise and wind sensing.' },
      { title: 'Wireless site deployment', description: 'Ideal for remote environmental monitoring.' },
      { title: 'Platform-ready', description: 'Feeds data into the MyMove IoT dashboard.' }
    ],
    applications: ['Air quality monitoring', 'Noise assessment', 'Weather conditions tracking'],
    specifications: [
      { label: 'Sensors', value: 'Air quality / noise / wind' },
      { label: 'Communication', value: 'LoRaWAN' },
      { label: 'Housing', value: 'Weatherproof' }
    ],
    images: ['/assets/GIM_Images/MS - Environmental Sensor.jpg']
  },
  {
    id: 'dynamic-displacement-sensor',
    name: 'Dynamic Displacement Sensor',
    category: 'displacement-settlement',
    shortDescription: 'Event-based wireless displacement sensor that records structural movement when thresholds are exceeded.',
    featureBullets: [
      'Wireless battery-powered monitoring',
      'Records events around threshold breaches',
      'Sends data efficiently over LoRaWAN'
    ],
    keyFeatures: [
      { title: 'Event capture', description: 'Records time windows around significant displacement events.' },
      { title: 'Remote transmission', description: 'Low-power data delivery over wireless networks.' },
      { title: 'Targeted monitoring', description: 'Ideal for dynamic structural movement measurement.' }
    ],
    applications: ['Crack development tracking', 'Dynamic settlement', 'Tunnel displacement monitoring'],
    specifications: [
      { label: 'Operation', value: 'Event-triggered displacement recording' },
      { label: 'Communication', value: 'LoRaWAN' },
      { label: 'Power', value: 'Battery powered' }
    ],
    images: ['/assets/GIM_Images/Ms - Dynamic Displacement Sensor.jpg']
  },
  {
    id: 'crack-meter',
    name: 'Crack Meter',
    category: 'displacement-settlement',
    shortDescription: 'Mechanical crack meter used to monitor changes in crack width on concrete and masonry structures.',
    featureBullets: [
      'Precision surface crack monitoring',
      'Durable acrylic reference plate',
      'Calibrated graduated scale for displacement tracking'
    ],
    keyFeatures: [
      { title: 'Surface crack measurement', description: 'Precise displacement readings across cracks.' },
      { title: 'Robust construction', description: 'Resistant to field exposure and vibration.' },
      { title: 'Easy reading', description: 'Clear graduated scale and cursor.' }
    ],
    applications: ['Concrete crack monitoring', 'Masonry structure inspection', 'Settlement detection'],
    specifications: [
      { label: 'Measurement', value: 'Crack width change' },
      { label: 'Scale', value: 'Graduated calibrated' },
      { label: 'Installation', value: 'Surface-mounted anchors' }
    ],
    images: ['/assets/GIM_Images/Crack meter.jpg']
  },
  {
    id: 'displacement-crack-meter',
    name: 'Displacement Crack Meter',
    category: 'displacement-settlement',
    shortDescription: 'Wireless crack meter for structural displacement monitoring with anchor-based installation.',
    featureBullets: [
      'Wireless displacement monitoring',
      'Battery-powered operation',
      'Suitable for concrete and steel structures'
    ],
    keyFeatures: [
      { title: 'Wireless reporting', description: 'Transmits displacement data remotely.' },
      { title: 'Field reliable', description: 'Works in harsh construction environments.' },
      { title: 'Anchor-based installation', description: 'Securely mounted across cracks and joints.' }
    ],
    applications: ['Crack growth tracking', 'Structural movement', 'Safety monitoring'],
    specifications: [
      { label: 'Type', value: 'Wireless crack meter' },
      { label: 'Power', value: 'Battery powered' },
      { label: 'Communication', value: 'LoRaWAN' }
    ],
    images: ['/assets/GIM_Images/VW Type Displacement Meter (Crack Meter).jpg']
  },
  {
    id: 'mechanical-rod-settlement-meter',
    name: 'Mechanical Rod Settlement Meter',
    category: 'displacement-settlement',
    shortDescription: 'Rod settlement meter for measuring ground or foundation settlement under load.',
    featureBullets: [
      'Tracks settlement through anchor and rod movement',
      'Used for consolidation and stability assessment',
      'Clear mechanical dial readout'
    ],
    keyFeatures: [
      { title: 'Settlement monitoring', description: 'Detects settlement of ground and foundations under load.' },
      { title: 'Mechanical simplicity', description: 'Dial gauge system for direct reading.' },
      { title: 'Robust design', description: 'Built for durable site measurement.' }
    ],
    applications: ['Ground settlement observation', 'Foundation displacement', 'Dam monitoring'],
    specifications: [
      { label: 'Display', value: 'Dial gauge' },
      { label: 'Application', value: 'Settlement measurement' },
      { label: 'Construction', value: 'Field ruggedized' }
    ],
    images: ['/assets/GIM_Images/Mechanical Type Rod Settlement Meter.jpg']
  },
  {
    id: 'crack-meter-mounting-jig',
    name: 'Crack Meter Mounting Jig',
    category: 'displacement-settlement',
    shortDescription: 'Specialised mounting jig for displacement meters, enabling accurate installation across movement zones.',
    featureBullets: [
      'Triple axial displacement measurement',
      'Waterproof mounting system',
      'Designed for expansion joints and cracks'
    ],
    keyFeatures: [
      { title: 'Secure installation', description: 'Holds displacement sensor precisely in place.' },
      { title: 'Triple axial capability', description: 'Measures movement along three axes.' },
      { title: 'Application flexibility', description: 'Suitable for joints, cracks and tunnels.' }
    ],
    applications: ['Joint monitoring', 'Crack displacement', 'Dam and tunnel inspection'],
    specifications: [
      { label: 'Axes', value: '3-axis' },
      { label: 'Installation', value: 'Waterproof mounting' },
      { label: 'Use', value: 'Expansion joints and cracks' }
    ],
    images: ['/assets/GIM_Images/Crack meter.jpg']
  },
  {
    id: 'dial-type-3d-joint-meter',
    name: 'Dial-Type 3D Joint Meter',
    category: 'displacement-settlement',
    shortDescription: '3D joint meter with three dial gauges for measuring movement at expansion joints and cracks.',
    featureBullets: [
      'Triple dial gauge monitoring',
      'Measures joint and crack movement',
      'Customizable mounting system'
    ],
    keyFeatures: [
      { title: '3D movement tracking', description: 'Monitors expansion joint displacement in three directions.' },
      { title: 'Dial gauge clarity', description: 'Easy-to-read mechanical indicators.' },
      { title: 'Installation flexibility', description: 'Customizable for dam, tunnel and tank applications.' }
    ],
    applications: ['Joint displacement', 'Crack movement', 'Dam and tunnel monitoring'],
    specifications: [
      { label: 'Sensors', value: '3 dial gauges' },
      { label: 'Measurement', value: 'Triple axial movement' },
      { label: 'Use', value: 'Expansion joint monitoring' }
    ],
    images: ['/assets/GIM_Images/Dial Gauge Type 3D Joint Meter.jpg']
  },
  {
    id: 'in-placement-extensometer',
    name: 'In-Placement Extensometer',
    category: 'displacement-settlement',
    shortDescription: 'In-place extensometer for precise measurement of subsurface displacement over long distances.',
    featureBullets: [
      'Customized length up to 4 meters',
      'Gauge length tuned to site conditions',
      'Rod body and cable connection for reliable readout'
    ],
    keyFeatures: [
      { title: 'Long-distance measurement', description: 'Captures subsurface movement over custom lengths.' },
      { title: 'Robust rod design', description: 'Designed for permanent or semi-permanent installations.' },
      { title: 'Accurate displacement data', description: 'Used in foundations and excavations.' }
    ],
    applications: ['Subsurface displacement', 'Excavation monitoring', 'Foundation movement tracking'],
    specifications: [
      { label: 'Length', value: 'Up to 4 m' },
      { label: 'Gauge length', value: 'Custom 1,000 mm' },
      { label: 'Installation', value: 'In-place extensometer' }
    ],
    images: ['/assets/GIM_Images/In-Placement VW Extensometer.jpg']
  },
  {
    id: 'water-level-indicator',
    name: 'Water Level Indicator',
    category: 'survey-markers',
    shortDescription: 'Portable hand-operated instrument for groundwater depth measurement in wells and boreholes.',
    featureBullets: [
      'Accurate groundwater depth readings',
      'Portable, hand-operated design',
      'Reliable in wells, boreholes and storage tanks'
    ],
    keyFeatures: [
      { title: 'Field portability', description: 'Easy to use in remote hydrogeological surveys.' },
      { title: 'Precise measurement', description: 'Reliable groundwater depth readings.' },
      { title: 'Robust construction', description: 'Built for well and tank conditions.' }
    ],
    applications: ['Groundwater monitoring', 'Borehole measurement', 'Hydrogeological surveys'],
    specifications: [
      { label: 'Application', value: 'Water level measurement' },
      { label: 'Portability', value: 'Hand-operated' },
      { label: 'Use', value: 'Wells and boreholes' }
    ],
    images: ['/assets/GIM_Images/Water Level Indicator.jpg']
  },
  {
    id: 'magnetic-extensometer',
    name: 'Magnetic Extensometer',
    category: 'survey-markers',
    shortDescription: 'Magnetic probe extensometer for settlement and heave monitoring in soil and rock applications.',
    featureBullets: [
      'Magnetic probe with graduated tape',
      'Monitors settlement and heave over time',
      'Suited for excavations, foundations and tunnels'
    ],
    keyFeatures: [
      { title: 'Settlement tracking', description: 'Measures vertical movement in soil and rock.' },
      { title: 'Magnetic probe system', description: 'Easy access and readout using tape and reel.' },
      { title: 'Versatile use', description: 'Applies to foundations, embankments and excavations.' }
    ],
    applications: ['Soil heave monitoring', 'Foundation settlement', 'Tunnel excavation'],
    specifications: [
      { label: 'Probe type', value: 'Magnetic' },
      { label: 'Measurement', value: 'Settlement / heave' },
      { label: 'Installation', value: 'Probe with reel tape' }
    ],
    images: ['/assets/GIM_Images/Magnetic Extensometer.jpg']
  },
  {
    id: 'pavement-marker',
    name: 'Pavement Marker',
    category: 'survey-markers',
    shortDescription: 'Die-cast aluminium settlement marker for pavement and surface movement monitoring.',
    featureBullets: [
      'Durable settlement reference marker',
      'Semi-spherical head for precise survey targeting',
      'Designed for long-term surface monitoring'
    ],
    keyFeatures: [
      { title: 'Surface reference', description: 'Provides a stable point for settlement surveys.' },
      { title: 'Robust build', description: 'Die-cast aluminium construction.' },
      { title: 'Precision targeting', description: 'Ideal for repeated monitoring visits.' }
    ],
    applications: ['Pavement settlement', 'Surface deformation', 'Road and runway monitoring'],
    specifications: [
      { label: 'Material', value: 'Die-cast aluminium' },
      { label: 'Diameter', value: '110 mm' },
      { label: 'Use', value: 'Settlement monitoring' }
    ],
    images: ['/assets/GIM_Images/Pavement Marker.jpg']
  },
  {
    id: 'building-settlement-marker',
    name: 'Building Settlement Marker',
    category: 'survey-markers',
    shortDescription: 'Settlement point marker for observing ground movement under buildings and fill areas.',
    featureBullets: [
      'Precision-machined spherical head',
      'Steel rod reference for settlement monitoring',
      'Used in embankments and filled ground'
    ],
    keyFeatures: [
      { title: 'Settlement reference point', description: 'Tracks vertical ground movement accurately.' },
      { title: 'Precision head', description: 'Stable spherical surface for survey instruments.' },
      { title: 'Field-ready', description: 'Suitable for construction and fill monitoring.' }
    ],
    applications: ['Building settlement', 'Embankment monitoring', 'Ground movement observation'],
    specifications: [
      { label: 'Rod diameter', value: '12 mm' },
      { label: 'Material', value: 'Steel' },
      { label: 'Use', value: 'Settlement point' }
    ],
    images: ['/assets/GIM_Images/Building Settlement Marker.jpg']
  },
  {
    id: 'ground-settlement-marker',
    name: 'Ground Settlement Marker',
    category: 'survey-markers',
    shortDescription: 'Settlement monitoring point for embankments and compacted fill with precise vertical movement tracking.',
    featureBullets: [
      'Records vertical ground movement',
      'Installed in embankments and filled areas',
      'Designed for progressive construction monitoring'
    ],
    keyFeatures: [
      { title: 'Ground movement observation', description: 'Helps assess performance of fill and embankment materials.' },
      { title: 'Vertical reference', description: 'Stable marker for repeated survey readings.' },
      { title: 'Construction-friendly', description: 'Used throughout build cycles.' }
    ],
    applications: ['Embankment monitoring', 'Ground fill settlement', 'Construction phase tracking'],
    specifications: [
      { label: 'Use', value: 'Ground settlement monitoring' },
      { label: 'Marker type', value: 'Vertical reference point' },
      { label: 'Installation', value: 'Embedded marker rod' }
    ],
    images: ['/assets/GIM_Images/Ground Settlement Marker.jpg']
  },
  {
    id: 'bi-reflex-target',
    name: 'Bi-Reflex Target',
    category: 'survey-markers',
    shortDescription: 'High-accuracy target for remote displacement monitoring with three-dimensional survey reference.',
    featureBullets: [
      'Precision target for remote distance measurement',
      'Suitable for structural displacement surveys',
      'Designed for reliable long-range detection'
    ],
    keyFeatures: [
      { title: '3D movement monitoring', description: 'Used with survey instruments for displacement tracking.' },
      { title: 'Precision reference', description: 'High accuracy detection from remote distance.' },
      { title: 'Robust construction', description: 'Built for field installation on structures.' }
    ],
    applications: ['Survey displacement monitoring', 'Structural movement measurement', 'Remote reference targets'],
    specifications: [
      { label: 'Target type', value: 'Bi-reflex' },
      { label: 'Use', value: 'Three-dimensional surveying' },
      { label: 'Safety', value: 'Stable reference installation' }
    ],
    images: ['/assets/GIM_Images/Bi-Reflex Target.jpg']
  }
];
