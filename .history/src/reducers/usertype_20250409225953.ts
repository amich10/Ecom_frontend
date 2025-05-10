// types/User.ts

export interface IUserImage {
    url: string;
    optimizedUrl: string;
  }
  
  export interface IUserDetail {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    gender: string;
    address: string;
    image: IUserImage;
    activationToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface IUserPagination {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  }
  
  export interface IUserState {
    userDetail: IUserDetail | null;
    userList: IUserDetail[] | null;
    userPagination: IUserPagination;
  }
  