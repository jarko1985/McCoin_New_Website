import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    webpack: (config, options) => {
        // Add canvas to externals
        config.externals = [...(config.externals || []), { canvas: "canvas" }];
        
        if (!options.isServer) {
            // Use null-loader for canvas in client-side builds
            config.module.rules.push({
                test: /canvas/,
                use: 'null-loader',
            });

            // Set fallback for canvas to false
            config.resolve.fallback = {
                ...(config.resolve.fallback || {}),
                canvas: false,
            };
        }
        return config;
    },
    experimental: {
        esmExternals: "loose", // required for canvas to work
    },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);