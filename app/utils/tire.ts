export function getPossibleTireWidth(rimWidthInches: number): {
    minTireWidth: number;
    maxTireWidth: number;
} {
    const mmPerInch = 25.4;
    const rimWidthMM = rimWidthInches * mmPerInch;

    let minTireWidth: number;
    let maxTireWidth: number;

    if (rimWidthMM <= 140) {
        // Narrow rims (up to 5.5"): realistic range
        minTireWidth = rimWidthMM * 1.1;
        maxTireWidth = rimWidthMM * 1.3;
    } else if (rimWidthMM <= 160) {
        minTireWidth = rimWidthMM * 1.2;
        maxTireWidth = rimWidthMM * 1.4;
    } else {
        minTireWidth = rimWidthMM * 1.05;
        maxTireWidth = rimWidthMM * 1.3;
    }

    // Round to nearest multiple of 5
    minTireWidth = Math.round(minTireWidth / 5) * 5;
    maxTireWidth = Math.round(maxTireWidth / 5) * 5;

    return {
        minTireWidth,
        maxTireWidth,
    };
}
