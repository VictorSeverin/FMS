import React from 'react'
import { useState } from 'react'
export default function ConfirmModal({ message, show, deleteDriver }) {
    const [showModal, setShowModal] = useState(true)
    function onClick() {
        deleteDriver()
    }
    return (
        <>
            {show ? (
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <div>
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        </label>
                    </div>
                </label>
            ) : null}
        </>
    )
}
