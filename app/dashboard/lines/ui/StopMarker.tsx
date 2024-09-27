import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

export default function StopMarker(props: any) {
    const {
        index,
        initialPosition,
        name,
        icon
    } = props;

  const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    return (
        <>
            <Marker
                key={index}
                icon={icon}
                position={position}
            >
                {name && (
                    <Popup>
                        {name}
                    </Popup>
                )}
            </Marker>
        </>
    );
}
