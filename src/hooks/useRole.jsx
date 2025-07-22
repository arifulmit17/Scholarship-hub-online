import { use } from "react"
import { AuthContext } from "../Contexts/AuthContext"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const useRole=()=>{
    const {user,loader}=use(AuthContext)
    const {data: role}=useQuery({
        queryKey:['role',user?.email],
        enabled: !loader && !!user?.email,
        queryFn: async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/user/role/${user?.email}`)
        return data
    },
    })
    return [role?.role]
}

export default useRole