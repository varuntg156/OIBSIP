function toCelsius(value, from){
	if(from === 'c') return value;
	if(from === 'f') return (value - 32) * 5/9;
	if(from === 'k') return value - 273.15;
}

function fromCelsius(value, to){
	if(to === 'c') return value;
	if(to === 'f') return (value * 9/5) + 32;
	if(to === 'k') return value + 273.15;
}

function convert(value, from, to){
	const c = toCelsius(value, from);
	return fromCelsius(c, to);
}

function round(value, decimals=2){
	const p = Math.pow(10, decimals);
	return Math.round((value + Number.EPSILON) * p) / p;
}

document.addEventListener('DOMContentLoaded', ()=>{
	const input = document.getElementById('temp-input');
	const fromUnit = document.getElementById('from-unit');
	const toUnit = document.getElementById('to-unit');
	const convertBtn = document.getElementById('convert-btn');
	const swapBtn = document.getElementById('swap-btn');
	const clearBtn = document.getElementById('clear-btn');
	const output = document.getElementById('output');
	const error = document.getElementById('error');

	function showError(msg){ error.textContent = msg; output.textContent = ''; }
	function showResult(text){ output.textContent = text; error.textContent = ''; }

	convertBtn.addEventListener('click', ()=>{
		const raw = input.value.trim();
		if(raw === ''){ showError('Please enter a temperature value.'); return; }

		const parsed = Number(raw);
		if(Number.isNaN(parsed)){
			showError('Invalid number. Use only digits and an optional decimal point.');
			return;
		}

		const from = fromUnit.value;
		const to = toUnit.value;
		if(from === to){
			showResult(`${round(parsed)} — same unit (${unitLabel(to)})`);
			return;
		}

		const converted = convert(parsed, from, to);
		showResult(`${round(converted)} ${unitLabel(to)}`);
	});

	swapBtn.addEventListener('click', ()=>{
		const a = fromUnit.value;
		fromUnit.value = toUnit.value;
		toUnit.value = a;
	});

	clearBtn.addEventListener('click', ()=>{
		input.value = '';
		output.textContent = '';
		error.textContent = '';
	});

	input.addEventListener('keydown', (e)=>{
		if(e.key === 'Enter') convertBtn.click();
	});

	function unitLabel(code){
		if(code === 'c') return '°C';
		if(code === 'f') return '°F';
		if(code === 'k') return 'K';
		return '';
	}
});

