import axios from "axios";

export type UserType = {
    "name": string,
    "id": number,
    "uniqueUrlName": null | string,
    "photos": {
        "small": null | string,
        "large": null | string
    },
    "status": null | string,
    "followed": boolean
}
type ResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "507e4eeb-d06e-45a3-a993-c786271c223b"},
})

export const apiUsers = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get <ResponseType>(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userID:number){
        return instance.post(`follow/${userID}`)
    },
    unfollow(userID:number){
        return instance.delete(`follow/${userID}`)
    },
    userProfile(userId:string){
        return profileAPI.userProfile(userId)
    },
}

export const profileAPI = {
    userProfile(userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId:string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status:string){
        return instance.put(`/profile/status`, {status})
    },
    savePhoto(photo:any){
        const formData = new FormData()
        formData.append("image", photo)
        return instance.put(`/profile/photo`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const authAPI = {
    me(){
        return instance.get('auth/me')
    },
    login(email:string, password:string, rememberMe?:boolean){
        return instance.post('/auth/login', {email,password, rememberMe})
    },
    logout(){
        return instance.delete('/auth/login')
    }
}

