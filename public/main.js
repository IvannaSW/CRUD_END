var update = document.getElementsByClassName('update');
var del = document.getElementsByClassName('delete');
//UPDATE
for (var i=0;i<update.length;i++){
update[i].addEventListener('click', function (event) {
  if (confirm("Ви справді бажаєте змінити дані?")) {
 fetch('data', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      '_id': event.target.id,
      'id': 'New number',
      'name': 'New name',
      'surname': 'New surname',
      'email':'New email',
      'age':'New age'
    })
  })
  .then(response => {
    if (response.ok) return response.json();
  })
  .then(data2 => {
    console.log(data2);
    window.location.reload(true);
  });
  }else{
  alert("Дані не буде змінено!");
}
});
}

//DELETE
for (var i=0;i<del.length;i++){
del[i].addEventListener('click', function (event) {
 if (confirm("Впевнені що хочете видалити з бази?")) {
  fetch('data', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '_id': event.target.id
    })
  })
  .then(res => {
    if (res.ok) return res.json();
  }).
  then(data2 => {
    console.log(data2);
    window.location.reload(true);
  });
}else{
  alert("Дані не будуть видалені!");
}});
}
