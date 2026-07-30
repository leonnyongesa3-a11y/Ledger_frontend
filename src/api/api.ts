const API_URL = "http://localhost:5000/api";


export async function getTransactions() {
    const res = await fetch(`${API_URL}/transactions`);
    return res.json();
}


export async function addTransaction(transaction:any) {
    const res = await fetch(`${API_URL}/transactions`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(transaction)
    });

    return res.json();
}