import React, {Component} from 'react';
import CsvDownload from 'react-json-to-csv'
import classnames from 'classnames';
import styles from '../Styles/DownloadRow.module.css';

export default class DownloadRow extends Component {
    render() {
        let styleContainer = classnames(styles.container)
        return (
            <div
                className={styleContainer}
            >
                {this.props.name} :  <CsvDownload data={this.props.data} filename={this.props.file} />
            </div>
        )
    }
}