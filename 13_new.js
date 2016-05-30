var storage = sessionStorage;
function doFirst(){
	var itemString = storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length-2).split(', ');

	newDiv = document.createElement('div');
	newTable = document.createElement('table');
	// 這邊不能 + var,因為是global variable
	total = 0;
	for(var key in items){
		var itemInfo = storage[items[key]];
		createCartList(itemInfo,items[key]);
		var sprice = parseInt(itemInfo.split('|')[2]);
		total += sprice;
	}
	document.getElementById('subtotal').innerHTML=total;
}
function createCartList(itemInfo,itemsKey){
	//alert(itemInfo+':'+itemsKey);
	var itemTitle = itemInfo.split('|')[0];
	var itemImage = itemInfo.split('|')[1];
	var itemPrice = parseInt(itemInfo.split('|')[2]);
	// 建立tag <tr>
	var trItemList = document.createElement('tr');
	// trItemList.className='item';
	trItemList.setAttribute('class','item');
	// 1. ceate image of item : the first <td>

	var tdImage = document.createElement('td');
	tdImage.style.width = "200px";

	var img = document.createElement('img');
	img.src = 'imgs/' + itemInfo.split('|')[1];
	img.width = "100";

	tdImage.appendChild(img);
	trItemList.appendChild(tdImage);

	// 2. ceate title of item : the second <td>
	var tdTitle = document.createElement('td');
	tdTitle.style.width = "280px";
	tdTitle.id = itemsKey;

	var pTitle = document.createElement('p');
	pTitle.innerHTML = itemTitle;
	var button = document.createElement('button');
	button.innerHTML = 'Delete';
	button.addEventListener('click',deleteHadle,false);

	tdTitle.appendChild(pTitle);
	tdTitle.appendChild(button);
	trItemList.appendChild(tdTitle);
	// 3. ceate price of item : the third <td>
	var tdPrice = document.createElement('td');
	tdPrice.style.width = "170px";
	tdPrice.innerHTML = itemPrice;
	tdPrice.id = itemsKey;

	trItemList.appendChild(tdPrice);

	// 4. ceate amount of item : the forth <td>
	var tdItemCount = document.createElement('td');
	tdItemCount.style.width = "60px";

	var itemCount = document.createElement('input');
	itemCount.type = 'number';
	itemCount.value = 1;
	itemCount.min=1;
	//itemCount.oninput = inputHandle;

	itemCount.addEventListener('input',
		function(){
			var counter = parseInt(this.value);
			//alert(counter);
			total -= parseInt(tdPrice.innerHTML);
			tdPrice.innerHTML = itemPrice*counter;
			total += itemPrice*counter;
			document.getElementById('subtotal').innerHTML=total;}
	,false);
	tdItemCount.appendChild(itemCount);
	trItemList.appendChild(tdItemCount);

	document.getElementById('cartList').appendChild(newDiv);
	newTable.appendChild(trItemList);
	newDiv.appendChild(newTable);

}
function deleteHadle(){
	var itemId = this.parentNode.getAttribute('id');
	//alert(itemId);
	var counter = parseInt(this.parentNode.nextSibling.nextSibling.firstChild.value);
	//alert(counter);
	// subtract the item price from subtotal
	var valueText = storage[itemId];
	total -= parseInt(valueText.split('|')[2])*counter;
	document.getElementById('subtotal').innerHTML=total;

	// clear the data in storage
	storage['addItemList'] = storage['addItemList'].replace(itemId+', ','');
	storage.removeItem(itemId);

	// delete this transaction
	this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
}
/*
function inputHandle(){
	var tableNode = this.parentNode.parentNode.parentNode;
	//alert(tableNode.nodeName);
	var terminalNum=tableNode.childNodes.length; // amounts of <tr>
	total = 0;
	for(var i=0;i<terminalNum;i++){
		var iprice = parseInt(tableNode.childNodes[i].childNodes[2].innerHTML);
		var counter = tableNode.childNodes[i].childNodes[3].firstChild.value;
		total += iprice * counter;
		}
	document.getElementById('subtotal').innerHTML=total;
}*/
window.addEventListener('load',doFirst,false);
