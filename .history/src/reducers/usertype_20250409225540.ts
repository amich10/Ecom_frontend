export interface UserImage {
    url: string;
    optimizedUrl: string;
  }
  
  export interface UserDetail {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    gender: string;
    address: string;
    image: UserImage;
    activationToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  