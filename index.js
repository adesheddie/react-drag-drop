import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { SampleBase } from './sample-base';
import * as data from './dataSource.json';

export class DragAndDrop extends SampleBase {
    constructor() {
        super(...arguments);
        this.dataA = new DataManager({
            json: data["dragAndDropA"]
        });
        this.dataB = new DataManager({
            json: data["dragAndDropB"]
        });
        this.fields = { text: 'Name' };
        this.modifiedDataA = { addedRecords: [], deletedRecords: [], changedRecords: [] };
        this.modifiedDataB = { addedRecords: [], deletedRecords: [], changedRecords: [] };
    }
    saveChanges() {
        this.dataA.saveChanges(this.modifiedDataA, this.fields.text);
        this.dataB.saveChanges(this.modifiedDataB, this.fields.text);
        this.modifiedDataA.addedRecords = [];
        this.modifiedDataB.addedRecords = [];
    }
    onDropGroupA(args) {
        args.items.forEach((item) => {
            if (!this.listObj1.getDataByValue(item[this.fields.text])) {
                this.modifiedDataB.addedRecords.push(item);
                this.modifiedDataA.deletedRecords.push(item);
            }
        });
    }
    onDropGroupB(args) {
        args.items.forEach((item) => {
            if (!this.listObj2.getDataByValue(item[this.fields.text])) {
                this.modifiedDataA.addedRecords.push(item);
                this.modifiedDataB.deletedRecords.push(item);
            }
        });
    }
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-12 control-section' style={{ minHeight: '450px' }}>
                    <div id="drag-drop-wrapper">
                        <div className="listbox-control">
                            <h4>Group A</h4>
                            <ListBoxComponent ref={(scope) => { this.listObj1 = scope; }} dataSource={this.dataA} scope="combined-list" height="330px" allowDragAndDrop={true} fields={this.fields} drop={this.onDropGroupA.bind(this)}/>
                        </div>
                        <span className="e-swap-icon"></span>
                        <div className="listbox-control">
                            <h4>Group B</h4>
                            <ListBoxComponent ref={(scope) => { this.listObj2 = scope; }} dataSource={this.dataB} scope="combined-list" height="330px" allowDragAndDrop={true} fields={this.fields} drop={this.onDropGroupB.bind(this)}/>
                            <button className="e-btn" onClick={this.saveChanges.bind(this)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

render(<DragAndDrop />, document.getElementById('sample'));