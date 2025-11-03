export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: "#0B1015",
                // panel: "#0D1117",
                panel: "#11161C",
                primary: "#2496ED",
                hover: "#1B82D1",
                navbar: "#0D63A5",
                accent: "#3DDC97",
                text: "#C9D1D9",
                muted: "#8B949E",
                border: "#1F2933",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    }, plugins: []
}
