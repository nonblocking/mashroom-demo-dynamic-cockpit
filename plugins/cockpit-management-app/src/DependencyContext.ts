import type {DependencyContext} from "./types";
import {createContext} from 'react';

export default createContext<DependencyContext>({} as any);
