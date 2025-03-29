import { Dispatch } from "react";
import { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from "react-hook-form";

export interface UserBase {
    name: string;
    email: string;
    password: string,
    profileImage: string;
    phoneNumber: string;
    location: string | { label: string; value: string };
    role: 'serviceProvider' | 'customer';
}

export interface User extends UserBase {
    work: Work[];
    group: string[];
    experience: number;
    membership: number;
    description: string;
    numberOfWorkers: number;
    numberOfServiceBays: number;
    rating: {
        average: number;
        count: number;
    };
}

export interface UserResponse extends UserBase {
    location: string;
    serviceProviderDetails: User
}

export interface Work {
    workTitle: string;
    workDescription: string;
    images: string[] | any;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    response: {
        data: {
            status: string,
            message: string
        }
    }
    role: 'customer' | 'serviceProvider',
    accessToken: string,
    userId: string,
}

export interface RegisterRequest extends UserBase {
    password: string;
    role: 'serviceProvider' | 'customer';
    work: Work[];
}

export interface RegisterResponse {
    status: string | number;
    message: string;
    user: User;
}

export interface LogoutResponse {
    status: string,
    message: string
}

export interface UseWorkProps {
    getValues: UseFormGetValues<any>;
    setValue: UseFormSetValue<any>;
    toggle: any
}

// Components
export interface DescriptionProps {
    control: Control<FieldValues>,
    setActiveTab: (val: number) => void,
    handleSubmit: UseFormHandleSubmit<FieldValues>,
}

export interface PersonalDetailsProps {
    control: Control<FieldValues>,
    errors: FieldErrors<FieldValues>;
    setActiveTab: (val: number) => void,
    handleSubmit: UseFormHandleSubmit<FieldValues>,
    role: 'customer' | 'serviceProvider'
}

export interface RegisterFormProps {
    control: Control<FieldValues>;
    errors: FieldErrors<FieldValues>;
    setActiveTab: (val: number) => void;
    isLoading: boolean;
    role: 'customer' | 'serviceProvider'
}

export interface RoleSelectionProps {
    setActiveTab: (val: number) => void;
    errors: FieldErrors<FieldValues>;
    control: Control<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues>
}

export interface WorkImagesProps {
    handleSubmit: UseFormHandleSubmit<FieldValues>,
    control: Control<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setActiveTab: (val: number) => void;
    errors: FieldErrors<FieldValues>;
}

export interface AddWorkImagesProps {
    control: Control<FieldValues>;
    errors: FieldErrors<FieldValues>;
    toggle: () => void;
    setValue: UseFormSetValue<FieldValues>;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
}

export interface ImageSlotProps {
    data: Work[],
    handleDeleteWork: (index: number) => void
}

// CONTEXT
export interface reducerStateType {
    currentUser: string | null;
    userRole: string;
    userId: string
};

export type reducerActionType =
    | { type: 'SET_CURRENT_USER'; payload: string }
    | { type: 'SET_USER_ROLE'; payload: string }
    | { type: 'SET_USER_ID'; payload: string }
    | { type: 'RESET_AUTH' };

export interface AuthContextType {
    state: reducerStateType;
    dispatch: Dispatch<reducerActionType>;
};

export interface ContextPropsType {
    children: React.ReactNode;
};