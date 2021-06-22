import React, {Component} from 'react';
import classnames from 'classnames';
import styles from '../Styles/DownloadRow.module.css';
import { CSVLink} from "react-csv";


export default class DownloadRow extends Component {
    render() {
        let styleContainer = classnames(styles.container)
        return (
            <div
                className={styleContainer}
            >
                {this.props.name} : <CSVLink
                                        data={this.props.data}
                                        separator=";"
                                        enclosingCharacter={`"`}
                                        filename={this.props.file}
                                    >Download</CSVLink>
            </div>
        )
    }

}