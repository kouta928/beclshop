$(function(){
    let storage = (localStorage.produtos) ? JSON.parse(localStorage.produtos) : [];

    //evento de cadastro
    $(document).on('submit', '#cadastraProduto', function(){
        //pegar valores dos campos
        let title = $('#title').val()
        let description = $('#description').val()
        let img = $('#img').val()
        let price = $('#price').val()

        //criar objeto para gravar os valores
        let item = {
        //  propriedade : variável
            title : title,
            description : description,
            img : img,
            price : price
        }

        //adicionar o objeto do item no array de produtos
        storage.push(item)

        //transformar em string json e guardar no storage
        localStorage.setItem("produtos", JSON.stringify(storage))


        loadProdutos()
        return false;
    })

    let loadProdutos = () => {
        let estrutura ='';
        let lista = (localStorage.produtos) ? JSON.parse(localStorage.produtos) : [];
        for(pos in lista){
            estrutura +=`
            <tr>
                <td>${lista[pos].title}</td>
                <td>${lista[pos].price}</td>
                <td>${lista[pos].img}</td>
                <td>${lista[pos].description}</td>
                <td>
                    <a href="#" class="btn btn-success editaItem" rel="${pos}">Editar</a>
                    <a href="#" class="btn btn-danger deletaItem" rel="${pos}">Deletar</a>
                </td>
            </tr>
            `
        }
        //injetar as linhas na tabela
        $('#loadProdutos').html(estrutura);
    }
    loadProdutos()

    //deletar um item
    $(document).on('click', ".deletaItem", function(){
        let itemId = $(this).attr('rel')
        storage.splice(itemId, 1);
        localStorage.setItem("produtos", JSON.stringify(storage))
        loadProdutos();
        return false;
    })
})