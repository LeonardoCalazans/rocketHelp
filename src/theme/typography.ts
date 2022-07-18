import { extendTheme } from 'native-base';

const TYPOGRAPHY = extendTheme({
    fonts: {
        heading: 'Roboto_700Bold',
        body: 'Roboto_400Regular',
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
    },
    sizes: {
        14: 56
    }
});

export default TYPOGRAPHY;
