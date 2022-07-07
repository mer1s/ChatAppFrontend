import React from 'react'
import { FiCheckCircle,FiXCircle } from 'react-icons/fi'
import styles from './CustomerRequest.module.css'

export default function CustomerRequest({customer}) {
  return (
    <div className={styles.container}>
      <p>{customer.senderUsername}</p>
      <div className={styles.iconsContainer}>
      <FiCheckCircle className={styles.greenIcon}/>
      <FiXCircle className={styles.redIcon}/>
      </div>
    </div>
  )
}
