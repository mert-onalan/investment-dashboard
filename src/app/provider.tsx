"use client";

import { WidgetsVisibilityContextProvider } from "@/context/widgets-visibility-context";
import { makeStore } from "@/libs/store";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

export default function Providers({ children }: { children: ReactNode }) {
    const store = makeStore();

    return (
        <ReduxProvider store={store}>
            <WidgetsVisibilityContextProvider>
                {children}
            </WidgetsVisibilityContextProvider>
        </ReduxProvider>
    );
}
