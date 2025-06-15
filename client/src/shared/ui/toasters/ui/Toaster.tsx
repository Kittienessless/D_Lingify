import { useCallback, useEffect } from 'react'
 import styles from './style.module.css'

export interface IToast {
  toastlist: any;
  position: any;
  setList : any
}

export const Toaster = ({ toastlist, position, setList } : IToast) => { 

 const deleteToast = useCallback( (id : any) => {
    const toastListItem = toastlist.filter((e :any)=> e.id !== id);
    setList(toastListItem);
  }, [toastlist, setList]);

 useEffect(() => {
    const interval = setInterval(() => {
      if(toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [toastlist, deleteToast]);
  
 return (
    <div className={`${styles.container} ${styles[position]}`}>
      {
        toastlist.map((toast :any, i : any) => (
          <div
            key={i}
            className={`${styles.notification} ${styles.toast} ${styles[position]}`}
            style={{ backgroundColor: toast.backgroundColor }}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div>
              <p className={styles.title}>{toast.title}</p>
              <p className={styles.description}>{toast.description}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
 
}

 