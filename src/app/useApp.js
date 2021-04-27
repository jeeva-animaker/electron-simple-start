import { useContext } from "react"
import { MainContext } from "./main"

export function useApp() {
    const { state, dispatch } = useContext(MainContext)

    return {

    }
}