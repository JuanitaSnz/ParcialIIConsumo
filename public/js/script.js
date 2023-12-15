function loadData(){
    return new Promise((resolve,reject)=>{
        fetch('https://api-dishes.vercel.app/')
        .then(result=>result.json())
        .then(result=>resolve(result))
        .catch(err=>reject(err))
    })
}

function showData(){
    const tbody = document.getElementById('tBody')
    loadData()
    .then(result=>{
        if(result.state){
            console.log(result.data)
            result.data.forEach(dish => {
                const row= document.createElement('tr')
                const colId=document.createElement('td')
                colId.appendChild(document.createTextNode(dish.idDish))
                row.append((colId))
                tbody.appendChild(row)

                const colName=document.createElement('td')
                colName.appendChild(document.createTextNode(dish.name))
                row.append((colName))
                tbody.appendChild(row)

                const colCalories=document.createElement('td')
                colCalories.appendChild(document.createTextNode(dish.calories))
                row.append((colCalories))
                tbody.appendChild(row)

                const colIsVegetarian=document.createElement('td')
                colIsVegetarian.appendChild(document.createTextNode(dish.isVegetarian))
                row.append((colIsVegetarian))
                tbody.appendChild(row)

                const colValue=document.createElement('td')
                colValue.appendChild(document.createTextNode(dish.value))
                row.append((colValue))
                tbody.appendChild(row)

                const colComments=document.createElement('td')
                colComments.appendChild(document.createTextNode(dish.comments))
                row.append((colComments))
               
                const colDelete = document.createElement('td');
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.classList.add('btn', 'btn-danger');
                    deleteButton.addEventListener('click', () => deleteObject(dish._id)); 
                    colDelete.appendChild(deleteButton);
                    row.appendChild(colDelete);
                    tbody.appendChild(row);


            });
        }else{
            alert('Algo ha salido mal')
        }
    })

}

const loadFields=()=>{

    const idDishValue=document.getElementById('id').value
    const nameValue= document.getElementById('nombre').value
    const caloriesValue= document.getElementById('calorias').value
    const isVegetarianValue= document.getElementById('vegetariano').value
    const valueValue= document.getElementById('valor').value
    const commentsValue= document.getElementById('comentarios').value
    const data ={"idDish":idDishValue,"name":nameValue,"calories":caloriesValue,"isVegetarian":isVegetarianValue,"value":valueValue,"comments":commentsValue}
    return JSON.stringify(data)
}

document.getElementById("buttonSend").addEventListener('click',()=>{
   const URI="https://api-dishes.vercel.app/"
    fetch(URI,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:loadFields()
    }).then(result=>result.json())
    .then(result=>{
        console.log(result)
        if(result.state){
            alert("Success")
            showData()
        }else{
            alert("El plato no ha podido ser agregado")
        }
  }).catch(err =>console.log(err))
  
})

document.getElementById("buttonConsult").addEventListener('click',()=>{
    const objectIdValue=document.getElementById('objectId').value;
    const URI=`https://api-dishes.vercel.app/${objectIdValue}`;

    fetch(URI)

    .then(result => {
        if (result.status === 404) {
            throw new Error('No se encontró el plato con el objectId proporcionado');
        }

        if (!result.ok) {
            throw new Error('Error al consultar el plato');
        }

        return result.json();
    })
    .then(result => {
        if (result.state) {
            if (result.data) {
                findByObjectId(result.data);
            } else {
                alert('No se encontró el plato con el objectId proporcionado');
            }
        }
    })
    .catch(err => console.log(err.message));
    })


function findByObjectId(foundObject){
    const foundObjectTable=document.getElementById('foundObjectTableBody');
    foundObjectTable.innerHTML='';

    const row = document.createElement('tr');
    const colId = document.createElement('td');
    colId.appendChild(document.createTextNode(foundObject.idDish));
    row.appendChild(colId);

    const colName = document.createElement('td');
    colName.appendChild(document.createTextNode(foundObject.name));
    row.appendChild(colName);

    const colCalories = document.createElement('td');
    colCalories.appendChild(document.createTextNode(foundObject.calories));
    row.appendChild(colCalories);

    const colIsVegetarian = document.createElement('td');
    colIsVegetarian.appendChild(document.createTextNode(foundObject.isVegetarian));
    row.appendChild(colIsVegetarian);

    const colValue = document.createElement('td');
    colValue.appendChild(document.createTextNode(foundObject.value));
    row.appendChild(colValue);

    const colComments = document.createElement('td');
    colComments.appendChild(document.createTextNode(foundObject.comments));
    row.appendChild(colComments);

    foundObjectTableBody.appendChild(row);

}

function deleteObject(objectId){
    const URI=`https://api-dishes.vercel.app/${objectId}`
    fetch(URI, {
        method: 'DELETE'
    }).then(result => result.json())
        .then(result => {
            if (result.state) {
                alert("Plato eliminado con éxito");
                showData();  
            } else {
                console.error('Error al eliminar el plato:', result.error);
                alert(`Error al eliminar el plato ${result.error}`);
            }
        })
        .catch(err => {
            console.error('Error al eliminar el plato:', err);
            alert('Error al eliminar el plato. Consulta la consola para más detalles.');
        });
}

showData()


