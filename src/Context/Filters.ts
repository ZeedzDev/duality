import * as React from 'react';

export type Filters = 'available';

export const FiltersContext = React.createContext<Filters[]>([]);
