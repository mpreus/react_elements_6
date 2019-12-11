/* lista użytkowników losowanych, np. do pełnienia dyżuru w niedzielę;
z możliwością dopisania użytkownika i losowania ponownego z udziałem tego dodanego */

class Draw extends React.Component {

    state = {
        softwareUsers: ["Adam", "Barbara", "Czarek", "Darek", "Ewa", "Franek", "Grażyna", "Henryk", "Irek", "Janina", "Karol", "Lidia", "Marek", "Norbert"],
        user: null,
        value: ""
    }
    
    handleShowList = () => {
        let listElements = document.getElementsByTagName("li");
        for (let i = 0; i < listElements.length; i++) {
            if (listElements[i].classList.contains("invisible")) {
                listElements[i].classList.remove("invisible")
                listElements[i].classList.add("visible")
            }
        }
    }
    handleHideList = () => {
        let listElements = document.getElementsByTagName("li");
        for (let i = 0; i < listElements.length; i++) {
            if (listElements[i].classList.contains("visible")) {
                listElements[i].classList.remove("visible")
                listElements[i].classList.add("invisible")
            }
        }
    }

    handleShowUser = () => {
        const index = Math.floor(Math.random() * this.state.softwareUsers.length);
        this.setState({
            user: this.state.softwareUsers[index]
        })
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
/* poniżej, jeśli input jest pusty, to klikanie na przycisk niczego nie dodaje */
    handleAddUser = () => {
        if (this.state.value === "") {
            return (
                alert("Niczego nie wpisałeś!")
            )
        }
/* takie dodanie jak poniżej można też przeprowadzić z metodą 'concat()':
const softwareUsers = this.state.softwareUsers.concat(this.state.value);
*/
        else {
            const softwareUsers = [...this.state.softwareUsers] /* kopia tablicy z bieżącymi wartościami */
            /* dodajemy do tablicy wartość z inputa i aktualizujemy 'state': */
            softwareUsers.push(this.state.value)
            this.setState({
                softwareUsers: softwareUsers, /* ponieważ klucz ze 'state' nazywa się 'softwareUsers' i nowa wartość tak samo, można tu dać tylko 'softwareUsers', bez 'softwareUsers: softwareUsers' */
                value: ""        /* czyścimy input, by móc wpisywać kolejne wartości */  
            })
            alert(`Użytkownik dodany. Aktualnie masz ${softwareUsers.length} użytkowników`)
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleShowList}>Zobacz wszystkich użytkowników</button>
                <ul>{this.state.softwareUsers.map( u => <li className="invisible" key={u}>{u}</li>)}</ul>
                <button onClick={this.handleHideList}>Schowaj listę użytkowników</button>
                <br/>
                <button onClick={this.handleShowUser}>Zobacz losowego użytkownika</button>
                <br/>
                <input type="text" value={this.state.value} onChange={this.handleInputChange} />
                <button onClick={this.handleAddUser}>Dodaj użytkownika</button>
                {this.state.user ? <h4>{this.state.user}</h4> : null}
            </div>
        )
    }
}

ReactDOM.render(
    <Draw />, 
    document.getElementById('root')
)