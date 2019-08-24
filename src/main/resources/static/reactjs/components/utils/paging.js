import React from 'react';

import { Pagination } from 'react-bootstrap';

export default class Paging extends React.Component {
    constructor(props) {
        super(props);

        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePrev() {
        if(this.props.activePage > 1) {
            const activePage = this.props.activePage;
            this.props.changeActivePage(activePage-1);
            this.props.getData(activePage-1);
        }
    }

    handleNext() {
        const totalPages = this.props.totalPages;
        const activePage = this.props.activePage;

        if(activePage < totalPages) {
            this.props.changeActivePage(activePage+1);
            this.props.getData(activePage+1);
        }
    }

    handleFirst() {
        this.props.changeActivePage(1);
        this.props.getData(1);
    }

    handleLast() {
        const totalPages = this.props.totalPages;
        this.props.changeActivePage(totalPages);
        this.props.getData(totalPages);
    }

    handlePageChange(event) {
        this.props.changeActivePage(Number(event.target.id));
        this.props.getData(Number(event.target.id));
    }

    render() {
        let active = this.props.activePage;
        let items = [];

        for(let i=1; i<=this.props.totalPages; i++) {
            items.push(
                <Pagination.Item key={i} id={i} active={i === active} onClick={this.handlePageChange}>
                    {i}
                </Pagination.Item>
            );
        }

        const pagination = (
            <Pagination>
                <Pagination.First onClick={this.handleFirst} />
                <Pagination.Prev onClick={this.handlePrev} />

                {items}

                <Pagination.Next onClick={this.handleNext} />
                <Pagination.Last onClick={this.handleLast} />
            </Pagination>
        );

        return (pagination);
    }
}