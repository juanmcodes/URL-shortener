const callToBackend = import.meta.env.VITE_PROD_URL || import.meta.env.VITE_DEV_URL;

export default callToBackend;