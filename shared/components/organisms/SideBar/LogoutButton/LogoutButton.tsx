import React, { FC } from 'react'
import Image from 'next/image'
import { Typography } from '../../../'
import { sideBarVariants } from '../../../../../shared/constants'
import '../SideBarItem/sideBarItem.scss'

interface LogoutButtonProps {
    variant?: sideBarVariants
}

export const LogoutButton: FC<LogoutButtonProps> = ({
    variant
}) => {
    const subtitle = null
    
    return (
        <form
            action="auth/signout"
            method="post"
        >
            <button
                type="submit"
                className={`msv-singleSideBarItem msv-singleSideBarItem--${variant}`}
            >
                <Image
                    src={"/images/logout.svg"}
                    width={16}
                    height={16}
                    blurDataURL={"/images/logout.svg"}
                    alt={'Logout option'}
                />
                <div>
                    <Typography variant="bodySmall" bold color="#434343">
                        Salir
                    </Typography>
                </div>
            </button>
        </form>
    )
}