export default function switchTab(tab="DISCOVER"){
        return {
            type: "CHANGE_TAB",
            payload: tab
        }
}