import component from './index.js';
import {
  R, X, 
  resetClassName, styleClassName, layoutClassName,
  inputClassName, spinnerClassName, 
  fileInputClassName, tableClassName 
} from './externals.js';

const classNames = [resetClassName, styleClassName, layoutClassName];

const spot = ['#tests', 'beforeEnd'];

onload = testAll;

function testAll() {
  testButton();
  testTextInput();
  testTagInput();
  testFileInput();
  testSelect();
  testSelect({multiple:true});
  testDateInput();
  testTextareaInput();
  testDatalist();
  testTable();
}

function testSelect({multiple:multiple=false}={}) {
  const s = component.select;

  s({
    name: 'select',
    multiple,
    classNames,
    label: 'Option',
    value: 'option-1',
    options: [
      {
        name: 'Option 1',
        value: 'option-1',
      },
      {
        name: 'Option 2',
        value: 'option-2'
      },
      {
        name: 'Option 3',
        value: 'option-3'
      }
    ]
  }).to(...spot);
}

function testButton() {
  const b = component.button;

  b({
    spinnerOnActive: true, 
    name: 'btn',
    value: 'ButtonValue',
    classNames,
    active: true,
    text: 'Button Text',
    type: 'submit',
    intent: undefined
  }).to(...spot);
}

function testSpinner() {
  const s = component.spinner;

  s({classNames}).to(...spot);
}

function testDateInput() {
  const ti = component.textInput;

  ti({
    round: false,
    classNames,
    spaced: true,
    name: 'month',
    label: 'Month (spaced)',
    type: 'month',
    rightElement: component.button({classNames,name:'btn', text:'Amazing Go', activeClassOnClick: false}),
  }).to(...spot);

  ti({
    round: false,
    classNames,
    name: 'date',
    label: R.skip('Date'),
    type: 'date',
    rightElement: component.button({classNames,name:'btn', text:'Go',spinnerOnActive:true})
  }).to(...spot);

  ti({
    round: false,
    classNames,
    name: 'datetime-local',
    label: R.skip('Date & Time'),
    type: 'datetime-local',
    rightElement: component.button({classNames, name:'btn', text:'Go',spinnerOnActive:true})
  }).to(...spot);
}

function testTextInput() {
  const ti = component.textInput;

  ti({
    id: 'crisrocks',
    round: false,
    classNames,
    handlers: {
      mouseover: e => console.log(e),
      click: e => console.log(e.target.localName + ' clicked')
    },
    name: 'text',
    placeholder: 'Your textual input',
    label: 'Text',
    type: 'text',
    rightElement: component.button({classNames, name:'btn', text:'Search',handlers: { click: e => console.log("btn clicked") },spinnerOnActive:true})
  }).to(...spot);
}

function testTagInput() {
  const ti = component.tagInput;

  ti({
    round: false,
    name: 'tags',
    classNames,
    label: 'Tags',
    values: [],
    spaced: true,
    placeholder: 'Starting tagging.',
    separator: /[,\n\r]/,
    rightElement: component.button({classNames, name:'btn', text:'Save',spinnerOnActive:true})
  }).to(...spot);
}

function testFileInput() {
  const fi = component.fileInput;

  fi({
    round: false,
    name: 'files',
    classNames,
    label: 'Files',
    multiple: false,
    text: 'Choose an image to upload',
    accept: 'image/*',
    rightElement: component.button({classNames, name:'btn-up', text:'Upload',spinnerOnActive:true})
  }).to(...spot);
}

function testTextareaInput() {
  const ti = component.textInput;

  ti({
    round: false,
    name: 'textarea',
    classNames,
    placeholder: 'Your multiline textual input',
    label: 'Textarea',
    type: 'textarea',
    spaced: true,
    rightElement: component.button({classNames, name:'btn', text:'Search',spinnerOnActive:true})
  }).to(...spot);
}

function testDatalist() {
  const dl = component.datalist;

  const Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const listFunction = i => i < Alphabet.length ? 'Agent ' + Alphabet[i] + '.' : null;

  dl({
    round: false,
    name: 'datalist',
    placeholder: R.attrskip("Relax it's cool to have a codename"),
    classNames,
    label: 'Pick your agent name (datalist)',
    type: 'text',
    list: listFunction,
    rightElement: component.button({classNames, name:'save-btn', text:'Save',spinnerOnActive:true})
  }).to(...spot);
}

function testTable() {
  const t = component.table;

  const rh = i => i < 10 ? `Row ${i}` : null;
  const ch = i => i < 10 ? `Column ${i}` : null;
  const cell = (i,j) => i < 10 && j < 10 ? i*j : null;

  t({
    round: false,
    name: 'table',
    classNames,
    label: 'What label for a table?',
    type: 'number',
    rowHeader: rh,
    inputSize: 3,
    columnHeader: ch,
    spaced: true,
    cell,
    rightElement: component.button({classNames, name:'save-btn', text:'Save',spinnerOnActive:true})
  }).to(...spot);
}


