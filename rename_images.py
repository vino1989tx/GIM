import os

path = 'src/assets/GIM Nextgen 2026'
rename_map = {
    1: 'gim-nextgen-cover.jpg',
    2: 'company-overview.jpg',
    3: 'about-us.jpg',
    4: 'real-time-monitoring.jpg',
    5: 'tiltmeter-wireless-sensor.jpg',
    6: 'accelerometer.jpg',
    7: 'vibrometer.jpg',
    8: 'environmental-sensor.jpg',
    9: 'dynamic-displacement-sensor.jpg',
    10: 'communication-node.jpg',
    11: 'gateway.jpg',
    12: 'inclinometer-monitoring-system.jpg',
    13: 'slope-indicator-specs.jpg',
    14: 'digital-tiltmeter.jpg',
    15: 'arc-weldable-strain-gauge.jpg',
    16: 'spot-weldable-strain-gauge.jpg',
    17: 'embedment-strain-gauge.jpg',
    18: 'soil-pressure-meter.jpg',
    19: 'vw-type-load-cell.jpg',
    20: 'center-hole-load-cell.jpg',
    21: 'soil-pressure-meter-variant.jpg',
    22: 'high-precision-tilt-meter.jpg',
    23: 'shotcrete-stress-meter.jpg',
    24: 'drive-point-piezometer.jpg',
    25: 'wheel-type-inplace-inclinometer.jpg',
    26: 'rock-bolt-stress-meter.jpg',
    27: 'in-placement-extensometer.jpg',
    28: 'piezometer.jpg',
    29: 'displacement-crack-meter.jpg',
    30: 'mechanical-rod-settlement-meter.jpg',
    31: 'crack-meter-mounting-jig.jpg',
    32: 'dial-type-3d-joint-meter.jpg',
    33: 'mems-el-beam-sensor.jpg',
    34: 'water-level-indicator.jpg',
    35: 'magnetic-extensometer.jpg',
    36: 'abs-inclinometer-casing.jpg',
    37: 'crack-meter.jpg',
    38: 'pavement-marker.jpg',
    39: 'building-settlement-marker.jpg',
    40: 'bi-reflex-target.jpg',
    41: 'ground-settlement-marker.jpg',
    42: 'tilt-plate.jpg',
    43: 'geotechnical-services.jpg'
}
files = sorted([f for f in os.listdir(path) if f.endswith('.jpg')], key=lambda x: int(x.split('_')[-1].split('.')[0]))
for idx, filename in enumerate(files, start=1):
    new_name = rename_map.get(idx)
    if not new_name:
        print('No mapping for', filename)
        continue
    src = os.path.join(path, filename)
    dst = os.path.join(path, new_name)
    if os.path.exists(dst):
        print('Destination exists, skipping', dst)
        continue
    os.rename(src, dst)
    print('Renamed', filename, 'to', new_name)
