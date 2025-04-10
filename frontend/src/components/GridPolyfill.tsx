import type React from 'react'
import { Grid as MuiGrid, type GridProps as MuiGridProps } from '@mui/material'

export interface PolyfillGridProps extends Omit<MuiGridProps, 'item'> {
    // Optional responsive props
    xs?: number | 'auto' | boolean;
    sm?: number | 'auto' | boolean;
    md?: number | 'auto' | boolean;
    lg?: number | 'auto' | boolean;
    xl?: number | 'auto' | boolean;
    item?: boolean;
}

export const Grid: React.FC<PolyfillGridProps> = ({
    children,
    xs,
    sm,
    md,
    lg,
    xl,
    item = false,
    ...props
}) => {
    return (
        <MuiGrid
            {...props}
            {...(item && { item: true })}
            {...(xs !== undefined && { xs })}
            {...(sm !== undefined && { sm })}
            {...(md !== undefined && { md })}
            {...(lg !== undefined && { lg })}
            {...(xl !== undefined && { xl })}
        >
            {children}
        </MuiGrid>
    )
}

export default Grid
