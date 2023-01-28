

export const colorToken = {
    greyColors: {
        0: "#ffffff",
        5: "#f1f2f3",
        10: "#e4e5e7",
        15: "#d6d8db",
        20: "#c9cacf",
        25: "#bbbdc3",
        30: "#aeb0b7",
        35: "#a0a3ab",
        40: "#93969f",
        45: "#858993",
        50: "#787c87",
        55: "#6c6f7a",
        60: "#60636c",
        65: "#54575f",
        70: "#484a51",
        75: "#3c3e44",
        80: "#303136",
        85: "#242529",
        90: "#202124",
        95: "#18191b",
        100: "#0c0c0e",
        900: "#000000"
    },
    mainColors: {
        20: "#99ffee",
        60: "#00e6bf",
        65: "#00ccaa",
        70: "#00b395",
        75: "#009980",
        80: "#00806a",
        85: "#006d5b",
        90: "#006655",
        95: "#004d40",
        100: "#00332b"
    },
};


/* Mui these settings */

export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark") ? {
                // dark mode
                primary: {
                    dark: colorToken.mainColors[85],
                    main: colorToken.mainColors[80],
                    light: colorToken.mainColors[70]
                },
                bg: {
                    light: colorToken.greyColors[90],
                    default: colorToken.greyColors[95]
                },
                txt: {
                    dark: colorToken.greyColors[40],
                    main: colorToken.greyColors[30],
                    light: colorToken.greyColors[20]
                },
                neutral: {
                    dark: colorToken.greyColors[40],
                    mediumDark: colorToken.greyColors[35],
                    main: colorToken.greyColors[30],
                    mediumMain: colorToken.greyColors[25],
                    light: colorToken.greyColors[20],
                    mediumLight: colorToken.greyColors[15],
                    white: colorToken.greyColors[5]
                },
                secondary: {
                    dark: colorToken.greyColors[100],
                    mediumDark: colorToken.greyColors[95],
                    main: colorToken.greyColors[85],
                    mediumMain: colorToken.greyColors[80],
                    light: colorToken.greyColors[75],
                    mediumLight: colorToken.greyColors[70]
                },

            }
                :
                {
                    // light mode
                    primary: {
                        dark: colorToken.mainColors[85],
                        main: colorToken.mainColors[80],
                        light: colorToken.mainColors[70]
                    },
                    bg: {
                        light: colorToken.greyColors[5],
                        default: colorToken.greyColors[10]
                    },
                    txt: {
                        dark: colorToken.greyColors[95],
                        main: colorToken.greyColors[90],
                        light: colorToken.greyColors[85]
                    },
                    neutral: {
                        dark: colorToken.greyColors[90],
                        mediumDark: colorToken.greyColors[85],
                        main: colorToken.greyColors[80],
                        mediumMain: colorToken.greyColors[75],
                        light: colorToken.greyColors[70],
                        mediumLight: colorToken.greyColors[65],
                        white: colorToken.greyColors[50]
                    },
                    secondary: {
                        dark: colorToken.greyColors[0],
                        mediumDark: colorToken.greyColors[5],
                        main: colorToken.greyColors[10],
                        mediumMain: colorToken.greyColors[15],
                        light: colorToken.greyColors[20],
                        mediumLight: colorToken.greyColors[25]
                    },
                }
        }
    }
}


