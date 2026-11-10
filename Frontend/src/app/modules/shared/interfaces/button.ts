import { Theme } from "./theme";

export interface ButtonConfig {
    id: string;
    type: ButtonType;
    title?: string;
    icon?: string;
    outline?: boolean;
    size?: ButtonSize;
}

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = Theme;