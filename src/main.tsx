import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import "./styles/index.css"
import {ConfigProvider} from "antd";
import {red} from "@ant-design/colors";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./providers/auth-provider";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <AuthProvider>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: red[5],
                    borderRadius: 20,
                },
                components: {
                    Card: {
                        headerBg: "#3b82f6"
                    },
                    Timeline: {
                        itemPaddingBottom: 0
                    }
                }
            }}
        >
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </ConfigProvider>
    </AuthProvider>
);