jQuery(document).ready(function ($) {
    var form = $('#form-customize'),
        contract = $('#contract');

    // Mapeia o nome do campo para a classe correspondente no contrato
    var mapping = {
        'customername': 'school-name',
        'customeraddress': 'cedente-name',
        'task1': 'cnpj',
        'task2': 'cep',
        'task3': 'address',
        'task4': 'municipality',
        'task5': 'uf',
        'task6': 'ie',
        'task7': 'im',
        'task8': 'legal-representative',
        'task9': 'cpf',
        'task10': 'position',
        'task11': 'account-cnpj',
        'task12': 'account-social-reason',
        'task13': 'bank',
        'task14': 'agency',
        'task15': 'account',
        'total': 'total', // Novo campo para o valor total
        'term': 'term'    // Novo campo para o tipo de cobrança
    };

    // Atualização dos campos do formulário no contrato
    form.on('focus keyup change', '.form-control', function (event) {
        event.preventDefault();
        var inputName = $(this).attr('name');
        var inputVal = $(this).val();

        // Atualiza o contrato com os valores do formulário
        updateContract(inputName, inputVal);
    });

    // Atualizar quando a seleção do tipo de cobrança muda
    form.on('change', 'select[name="term"]', function () {
        var selectedOptionText = $(this).find('option:selected').text();
        updateContract('term', selectedOptionText);
    });

    // Função para atualizar o contrato
    function updateContract(inputName, inputVal) {
        var contractClass = mapping[inputName];
        if (contractClass) {
            if (inputVal.length) {
                contract.find('.' + contractClass).addClass('item-editing').text(inputVal);
            } else {
                contract.find('.' + contractClass).removeClass('item-editing').text('');
            }
        }
	}

	/*
	Toggle sidebar visibility
	 */
	$('.cmn-toggle-switch').on('click', function (event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$('#wrapper').toggleClass('toggled');
	});

	/*
	Media Queries
	 */
	if (matchMedia) {
		var mq = window.matchMedia('(min-width: 768px) and (max-width: 1200px)');
		mq.addListener(WidthChange);
		WidthChange(mq);
	}

	function WidthChange(mq) {
		if (mq.matches) {
			$('textarea[name="payment"]').attr('rows', 1);
		} else {
			$('textarea[name="payment"]').attr('rows', 2);
		}
	}

	// Adiciona um manipulador de eventos para o botão de salvar PDF
    $('#create-pdf-btn').on('click', function (event) {
        event.preventDefault();

        // Configurações para o PDF
        var opt = {
            margin:       10,
            filename:     'contrato.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Elemento que contém o contrato
        var element = document.getElementById('contract');

        // Chama a função html2pdf para criar o PDF
        html2pdf(element, opt);
    });
});
