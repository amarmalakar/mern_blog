import { useState } from "react"

const TextSortner = ({text}) => {
    const [finalText] = useState(text.length > 100 ? text.substring(0, 99)+'...' : text);

    return (
        <p>{finalText}</p>
    )
}

export default TextSortner