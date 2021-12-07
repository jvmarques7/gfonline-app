import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Cadastro from '../pages/cadastro';
import Initial from '../pages/initial';
import { BrowserRouter } from 'react-router-dom';
import Default from '../pages/default';
import { AreaAtleta } from '../pages/areaAtleta';
import { Calendar } from '../pages/calendar';

  export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Rotas Usuários */}
                <Route path="/sign" component={Initial} />
                <Route path="/cadastro/:id" component={Cadastro} />
                <Route path="/" exact component={Default} />
                <Route path="/area_atleta" component={AreaAtleta} />
                <Route path="/calendario" component={Calendar} />
            </Switch>
        </BrowserRouter>
    );
  }