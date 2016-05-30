var storage = sessionStorage;
function doFirst(){
	if(storage['addItemList']==null){
		storage['addItemList']=''
		/* storage.setitem('addItemList',''); */
	}
	var spans = document.querySelectorAll('.addButton');
	for(var i=0; i<spans.length;i++){
		spans[i].addEventListener('click',function(){
			//alert(this.id);
			var teddyInfo = document.querySelector('#'+this.id+' input').value;
		addItem(this.id,teddyInfo);
		},false);

	}
}
function addItem(itemId, itemValue){
	//alert(itemId+': '+itemValue);
	var img = document.createElement('img');
	img.src = 'imgs/' + itemValue.split('|')[1];
	img.id = 'itemImageSelect';

	var title = document.createElement('span');
	title.innerHTML = itemValue.split('|')[0];
	title.id = 'titleSelect';

	var price = document.createElement('span');
	price.innerHTML = itemValue.split('|')[2];
	price.id = 'priceSelect';

	var newItem =document.getElementById('newItem');
	//刪除原有物件
		/* if(newItem.hasChildNodes()){
		while(newItem.childNodes.length >= 1){
			newItem.removeChild(newItem.firstChild);
		}
	} */
		while(newItem.hasChildNodes()){
			newItem.removeChild(newItem.firstChild);
	}
	// 顯示新物件
	newItem.appendChild(img);
	newItem.appendChild(title);
	newItem.appendChild(price);

	// save in storage
	if(storage[itemId]){
		alert('You have checked');
	} else{
		storage[itemId] = itemValue;
		storage['addItemList']+= itemId + ', ';
	}
	// calculate the number of items
	var itemString = storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length-2).split(', ');
	// itemString.length-2 去掉後面的逗號跟空格
	//alert(items.length);
	var total = 0;
	for(var key in items){
		//alert(key + items[key]); // key is a number in [0, items.length]
		var itemInfo = storage[items[key]];
		//var itemInfo = storage.getItem[items[key]];
		var sprice = parseInt(itemInfo.split('|')[2]);
		total += sprice;
	}

	document.getElementById('itemCount').innerHTML = items.length;
	document.getElementById('subtotal').innerHTML = total;

}
window.addEventListener('load',doFirst,false);
